# Wedding Invitation Web App — Requirements

## 🎯 Project Goal
Build a **beautiful, elegant digital wedding invitation** for **Abin Joseph & Shanthal Denny**, hosted on **GitHub Pages** (static, no backend).

---

## 📱 Core Architecture
1. **Single-page app** (`index.html`) with URL query parameter routing (`?view=`)
2. **Four distinct views:**
   - `?view=groom-wedding` — Groom's side, wedding only
   - `?view=groom-both` — Groom's side, betrothal + wedding
   - `?view=bride-betrothal` — Bride's side, betrothal only
   - `?view=bride-both` — Bride's side, betrothal + wedding
3. **Mobile-first design** — primarily viewed on phones, but desktop support also needed
4. **Landing page** (no `?view=` param) — shows links to all four views

---

## 🎨 Design & Theming
5. **Groom theme:** Deep burgundy + gold color palette on cream background

---

## 📝 Content Requirements
8. **English only** — all Malayalam text removed
9. **Invitation text** changes by perspective:
   - Groom: "Gracy Joseph cordially invites you… her beloved son"
   - Bride: "Denny Joseph & Jisha Denny cordially invite you… their beloved daughter"
10. **Couple cards** swap order based on perspective (groom-first or bride-first)
11. **Compliments section** (dynamic per view):
    - Groom views: **Alphonsa & Jojo** + **Anton · Anson**
    - Bride views: **Sharon**
12. **Phone numbers** switch by perspective:
    - Groom: +91 94956 72609
    - Bride: +91 94470 25551

---

## 🗓️ Event Details
13. **Betrothal** — April 26, 2026:
    - Vijnanamatha Church, Thodupuzha (4:00 PM) → Josh Pavilion Auditorium, Thodupuzha (Reception)
14. **Wedding** — May 9, 2026:
    - St. Joseph's Church, Kizhathadiyoor (11:00 AM) → Sunstar Convention Centre, Pala (Reception)
15. **Google Maps links** — updated to correct `maps.app.goo.gl` short links for all four venues

---

## 🏗️ UI/Layout Requirements
16. **Save the Date section:** Simple, clean, elegant — just **stacked white cards** with a "followed by" text divider.
17. **Font sizes:** Invitation text and parent names must be **large enough to read comfortably** on mobile
18. **Countdown:** White rounded pill card on cream background with gold colon separators
19. **Compliments:** Deep burgundy/red background with gold gradient text
20. **Footer:** Clean cream background, italic closing quote, green WhatsApp button, phone number

---

## Testing
- Use the playwright MCP server to test all four views on both mobile and desktop screen sizes, ensuring all content is correct and layouts are responsive.
- Whenever new UI changes are made, run the tests to verify that the design and content remain consistent across all views.
- Before making design changes, review the current design using the MCP server to understand the existing layout and styling, ensuring that any modifications enhance the overall aesthetic without breaking the user experience.

## 🚀 Deployment
21. **GitHub Pages** — deploy from `main` branch, `/ (root)` directory
22. Share distinct URLs with `?view=` parameters to guests
