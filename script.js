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
        { name: 'Sharon', primary: true },
      ],
    },
    'bride-both': {
      perspective: 'bride',
      showBetrothal: true,
      showWedding: true,
      heroDate: 'April 26 & May 9, 2026',
      countdownTarget: new Date('2026-04-26T16:00:00+05:30'),
      countdownLabel: 'Until the Betrothal',
      compliments: [
        { name: 'Sharon', primary: true },
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
    initCountdown(VIEWS[viewKey].countdownTarget, VIEWS[viewKey].countdownLabel);
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
      coupleContainer.insertBefore(brideFirst, coupleContainer.firstChild);
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
        invitationHeading.innerHTML = 'Denny Joseph &amp; Jisha Denny<br>cordially invite you';
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
        phoneLink.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13 19.79 19.79 0 011.63 4.45 2 2 0 013.6 2.27h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.16 6.16l.95-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg><a href="tel:+919495672609">+91 94956 72609</a>';
      } else {
        phoneLink.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13 19.79 19.79 0 011.63 4.45 2 2 0 013.6 2.27h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.16 6.16l.95-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg><a href="tel:+919447025551">+91 94470 25551</a>';
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

  // ── Countdown Timer ────────────────────────────────
  function initCountdown(targetDate, label) {
    const countdownLabel = document.getElementById('countdown-label');
    if (countdownLabel) {
      countdownLabel.textContent = label;
    }

    function update() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        document.getElementById('countdown-days').textContent = '0';
        document.getElementById('countdown-hours').textContent = '0';
        document.getElementById('countdown-minutes').textContent = '0';
        document.getElementById('countdown-seconds').textContent = '0';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('countdown-days').textContent = days;
      document.getElementById('countdown-hours').textContent = hours;
      document.getElementById('countdown-minutes').textContent = minutes;
      document.getElementById('countdown-seconds').textContent = seconds;
    }

    update();
    setInterval(update, 1000);
  }
})();
