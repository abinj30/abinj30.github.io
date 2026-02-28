/* ===================================================
   Wedding Invitation — Abin & Shanthal
   View Logic + Animations
   =================================================== */

(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────
  const VIEWS = {
    'groom-wedding': {
      perspective: 'groom',
      showBetrothal: false,
      showWedding: true,
      heroDate: 'May 9, 2026',
      countdownTarget: new Date('2026-05-09T11:00:00+05:30'),
      countdownLabel: 'Until the Wedding',
      compliments: [
        { name: 'Alphonsa &amp; Jojo', primary: true },
        { name: 'Anton &middot; Anson', primary: false },
      ],
    },
    'groom-both': {
      perspective: 'groom',
      showBetrothal: true,
      showWedding: true,
      heroDate: 'April 26 & May 9, 2026',
      countdownTarget: new Date('2026-04-26T16:00:00+05:30'),
      countdownLabel: 'Until the Betrothal',
      countdownAlt: {
        target: new Date('2026-05-09T11:00:00+05:30'),
        label: 'Until the Wedding',
      },
      compliments: [
        { name: 'Alphonsa &amp; Jojo', primary: true },
        { name: 'Anton &middot; Anson', primary: false },
      ],
    },
    'bride-betrothal': {
      perspective: 'bride',
      showBetrothal: true,
      showWedding: false,
      heroDate: 'April 26, 2026',
      countdownTarget: new Date('2026-04-26T16:00:00+05:30'),
      countdownLabel: 'Until the Betrothal',
      compliments: [
        { name: 'Sharon Denny', primary: true },
      ],
    },
    'bride-both': {
      perspective: 'bride',
      showBetrothal: true,
      showWedding: true,
      heroDate: 'April 26 & May 9, 2026',
      countdownTarget: new Date('2026-04-26T16:00:00+05:30'),
      countdownLabel: 'Until the Betrothal',
      countdownAlt: {
        target: new Date('2026-05-09T11:00:00+05:30'),
        label: 'Until the Wedding',
      },
      compliments: [
        { name: 'Sharon Denny', primary: true },
      ],
    },
  };

  // ── Initialization ─────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const viewKey = params.get('view');

    if (!viewKey || !VIEWS[viewKey]) {
      // Show landing page, hide invitation
      showLanding();
      return;
    }

    // Hide landing, show invitation
    hideLanding();
    applyView(VIEWS[viewKey]);
    initScrollReveal();
    initCountdown(VIEWS[viewKey].countdownTarget, VIEWS[viewKey].countdownLabel, VIEWS[viewKey].countdownAlt);
    initAmbientAudio();
  });

  // ── Landing Page ───────────────────────────────────
  function showLanding() {
    const landing = document.getElementById('landing-page');
    const invitation = document.getElementById('invitation');
    if (landing) landing.classList.remove('hidden');
    if (invitation) invitation.classList.add('hidden');
  }

  function hideLanding() {
    const landing = document.getElementById('landing-page');
    const invitation = document.getElementById('invitation');
    if (landing) landing.classList.add('hidden');
    if (invitation) invitation.classList.remove('hidden');
  }

  // ── Apply View ─────────────────────────────────────
  function applyView(config) {
    if (config.perspective === 'bride') {
      document.body.classList.add('theme-bride');
    } else {
      document.body.classList.remove('theme-bride');
    }

    // Show/hide event sections
    var betrothalSection = document.getElementById('betrothal-section');
    var weddingSection = document.getElementById('wedding-section');

    if (betrothalSection) {
      betrothalSection.classList.toggle('hidden', !config.showBetrothal);
    }
    if (weddingSection) {
      weddingSection.classList.toggle('hidden', !config.showWedding);
    }

    // Update hero date
    var heroDate = document.getElementById('hero-date');
    if (heroDate) {
      heroDate.textContent = config.heroDate;
    }

    // Perspective: move bride card first visually for bride views
    var coupleContainer = document.querySelector('.couple-container');
    var groomFirst = document.getElementById('groom-card');
    var brideFirst = document.getElementById('bride-card');

    if (config.perspective === 'bride' && coupleContainer && groomFirst && brideFirst) {
      // Rebuild order: bride | divider | groom (to match 1fr auto 1fr grid)
      var coupleDiv = coupleContainer.querySelector('.couple-divider');
      [brideFirst, coupleDiv, groomFirst].forEach(function(el){ coupleContainer.removeChild(el); });
      [brideFirst, coupleDiv, groomFirst].forEach(function(el){ coupleContainer.appendChild(el); });
    }

    // Perspective: swap hero names so bride name appears first in bride views
    var heroNames = document.querySelector('.hero-names');
    var heroGroomName = document.getElementById('hero-groom-name');
    var heroBrideName = document.getElementById('hero-bride-name');
    var heroAmp = heroNames ? heroNames.querySelector('.hero-ampersand') : null;
    if (config.perspective === 'bride' && heroNames && heroGroomName && heroBrideName && heroAmp) {
      [heroBrideName, heroAmp, heroGroomName].forEach(function(el){ heroNames.removeChild(el); });
      [heroBrideName, heroAmp, heroGroomName].forEach(function(el){ heroNames.appendChild(el); });
    }

    // Update invitation text based on perspective
    var invitationHeading = document.getElementById('invitation-heading');
    var invitationBody = document.getElementById('invitation-body');

    if (config.perspective === 'groom') {
      if (invitationHeading) {
        invitationHeading.innerHTML = 'Gracy Joseph<br>cordially invites you';
      }
      if (invitationBody) {
        invitationBody.textContent =
          'to celebrate the joyous occasion of the marriage of her beloved son';
      }
    } else {
      if (invitationHeading) {
        invitationHeading.innerHTML = 'Denny &amp; Jisha<br>cordially invite you';
      }
      if (invitationBody) {
        invitationBody.textContent =
          'to celebrate the joyous occasion of the marriage of their beloved daughter';
      }
    }

    // Update phone number based on perspective
    var phoneLink = document.getElementById('phone-contact');
    if (phoneLink) {
      if (config.perspective === 'groom') {
        phoneLink.setAttribute('href', 'tel:+919495672609');
      } else {
        phoneLink.setAttribute('href', 'tel:+919447025551');
      }
    }

    // Render compliments names
    var complimentsEl = document.getElementById('compliments-names');
    if (complimentsEl && config.compliments) {
      complimentsEl.innerHTML = config.compliments.map(function (c) {
        return '<p class="sibling-name' + (c.primary ? '' : ' secondary') + '">' + c.name + '</p>';
      }).join('');
    }
  }

  // ── Scroll Reveal ──────────────────────────────────
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show everything
      reveals.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  // ── Ambient Audio ────────────────────────────────
  function initAmbientAudio() {
    var audio = document.getElementById('ambient-audio');
    var btn = document.getElementById('music-btn');
    if (!audio || !btn) return;

    btn.hidden = false;
    var playing = false;
    audio.volume = 0.35;

    function startPlayback() {
      audio.play().then(function () {
        playing = true;
        btn.classList.add('music-playing');
      }).catch(function () {
        // Autoplay blocked by browser — will retry on first interaction
        playing = false;
        btn.classList.remove('music-playing');
        waitForInteraction();
      });
    }

    // Fallback: play on first user interaction if autoplay was blocked
    function waitForInteraction() {
      function onInteraction() {
        document.removeEventListener('scroll', onInteraction, true);
        document.removeEventListener('touchstart', onInteraction, true);
        document.removeEventListener('click', onInteraction, true);
        if (!playing) startPlayback();
      }
      document.addEventListener('scroll', onInteraction, { passive: true, capture: true, once: true });
      document.addEventListener('touchstart', onInteraction, { passive: true, capture: true, once: true });
      document.addEventListener('click', onInteraction, { capture: true, once: true });
    }

    // Try to autoplay immediately
    startPlayback();

    // Button toggles play/pause
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (playing) {
        audio.pause();
        playing = false;
        btn.classList.remove('music-playing');
      } else {
        startPlayback();
      }
    });
  }

  // ── Countdown Timer ────────────────────────────────
  function initCountdown(targetDate, label, altConfig) {
    var countdownSection = document.querySelector('.countdown-section');
    var countdownLabelEl = document.getElementById('countdown-label');
    var currentTarget = targetDate;
    var currentLabel = label;
    var isShowingAlt = false;
    var intervalId = null;

    if (countdownLabelEl) countdownLabelEl.textContent = label;

    // Set up toggle for dual-event views
    if (altConfig && countdownSection) {
      countdownSection.classList.add('countdown-toggleable');
      var inner = countdownSection.querySelector('.countdown-inner');
      var hint = document.createElement('p');
      hint.className = 'countdown-toggle-hint';
      hint.innerHTML = '<span class="countdown-toggle-dot active"></span><span class="countdown-toggle-dot"></span>';
      if (inner) inner.appendChild(hint);

      countdownSection.addEventListener('click', function () {
        if (intervalId) clearInterval(intervalId);
        isShowingAlt = !isShowingAlt;
        currentTarget = isShowingAlt ? altConfig.target : targetDate;
        currentLabel = isShowingAlt ? altConfig.label : label;
        if (countdownLabelEl) countdownLabelEl.textContent = currentLabel;
        var dots = hint.querySelectorAll('.countdown-toggle-dot');
        dots[0].classList.toggle('active', !isShowingAlt);
        dots[1].classList.toggle('active', isShowingAlt);
        start();
      });
    }

    function update() {
      var now = new Date();
      var diff = currentTarget - now;

      if (diff <= 0) {
        document.getElementById('countdown-days').textContent = '0';
        document.getElementById('countdown-hours').textContent = '0';
        document.getElementById('countdown-minutes').textContent = '0';
        document.getElementById('countdown-seconds').textContent = '0';
        return;
      }

      document.getElementById('countdown-days').textContent = Math.floor(diff / 86400000);
      document.getElementById('countdown-hours').textContent = Math.floor((diff % 86400000) / 3600000);
      document.getElementById('countdown-minutes').textContent = Math.floor((diff % 3600000) / 60000);
      document.getElementById('countdown-seconds').textContent = Math.floor((diff % 60000) / 1000);
    }

    function start() {
      update();
      intervalId = setInterval(update, 1000);
    }

    start();
  }
})();
