# Sekhar & Meena — Wedding Invitation Web App

## Original Problem Statement
Mobile-first wedding invitation webpage: a dog video (Video1) asks the guest to tap the door; on tap a flower blast happens and doors open (Video2); the background then blurs and the invitation appears. Content: Sekhar & Meena, scratch card with wedding date 21 Nov 2026, live countdown, venue (Chavas Grand Function Hall), itinerary (20 Nov Haldi 7 AM, 20 Nov Sangeeth 7 PM), Add to Calendar, Google Maps popup, location link (https://share.google/eJVH415p0UFWWCHqp), replay door opening, WhatsApp share, full traditional wording from the additional-info photo, and the "Vennilave Vennilave" song starting on door tap with a mute button.

## User Personas
- Wedding guests (mostly mobile) who open the shared link
- Family members sharing the invite via WhatsApp

## Architecture
- Frontend-only React app (CRA + craco), no backend data needed
- Stage machine in App.js: door (video1) → opening (video2 + canvas petal burst) → invitation
- Media served from /app/frontend/public/assets (video1.mp4, video2.mp4, song.mp3, background.jpg)
- framer-motion (masked line hero reveal, scroll reveals, parallax), lenis (smooth scrolling)
- Design system: deep peacock-teal ink (#061614), antique gold (#d4af37), ivory (#f0e6d2); Great Vibes / Fraunces / Cormorant Garamond

## Implemented (18 Sep 2026)
- Door stage with looping dog video + pulsing "Tap to Open" target
- Door-opening stage: Video2 plays with canvas flower/petal blast, skip button
- Invitation reveal on blurred peacock-feather background with parallax + grain
- Kinetic hero: masked line-by-line reveal "Sekhar & Meena", date strip
- Slow editorial marquee
- Chapter 01 The Invitation: full traditional wording (blessings, Smt. Devasena, parents' names, 8:56 PM Mithuna Lagnam)
- Chapter 02: gold scratch card revealing 21 November 2026 (canvas, pointer-based) + live countdown to 21 Nov 2026 8:56 PM IST
- Chapter 03: venue with Google Maps embed modal + share.google directions link
- Chapter 04: timeline — Haldi, Sangeeth, Muhurtham
- Actions: Add to Calendar (Google Calendar link), WhatsApp share, Replay Door Opening
- Music: song starts on door tap, loops, mute/unmute floating button
- Footer: best compliments from Karthik-Meera, Dr. Supreeth-Dr. Pravallika & Suchithra; S♥M monogram

## Verification
- E2E browser flow tested: tap → opening → invitation → scratch → map modal → actions (all data-testids present)
- Countdown ticking correctly (64 days at time of test)
- Media assets return HTTP 206 (range) correctly
- No auth/credentials needed for this app

## Implemented (20 Sep 2026 — iteration 2)
- Compressed video1.mp4 from 28.8 MB to 0.92 MB (720px, CRF 28, no audio, faststart) + poster frame so the door paints instantly
- OG/Twitter share meta tags with custom 1200x630 og-image.jpg (temple photo) — WhatsApp/social link previews show Sekhar & Meena's names
- New Chapter 03 "The Couple": editorial gallery with 5 user photos (auto-rotated upright, resized to 1600px, lazy-loaded), clipped-frame reveals, gold offset frames, roman-numeral captions; Venue/Celebrations renumbered to 04/05
- Removed door-stage overlay text that clashed with text baked into the video

## Implemented (20 Sep 2026 — iteration 3)
- Compressed video2.mp4 (door-opening) from 5.7 MB to 0.92 MB — both videos now under 1 MB each
- Radha Krishna transparent artwork (StickPNG, 525x830 RGBA) added as: golden-glow floating emblem atop Chapter 01 (mirrors the deity emblem on the physical card), small emblem above the hero names, and a faint 9%-opacity watermark in the fixed background
- RSVP preference noted for later: wishes only, no attendance fields

## Implemented (20 Sep 2026 — iteration 4, visual edits)
- Hero: removed Radha Krishna emblem and the two date lines; fixed script-font swash cropping (padded mask) so "Sekhar"'s S renders fully
- Names updated to full forms: Raja Sekhar & Meena Kumari (hero keeps short names)
- Chapter 01: removed floating deity emblem and the closing "Kindly grace…" paragraph
- Background: user's uploaded peacock photo now clearly visible as blurred page background (fixed stacking bug — opaque .App/body backgrounds were painting over the -z-10 layer; removed them). Overlay tuned to 55% for readability, Radha Krishna watermark faintly behind hero

## Backlog
- P1: Guest wishes form (wishes only, per user) — needs backend + MongoDB
- P2: Multi-language toggle (Telugu / English)

## Next Tasks
1. Build wishes-only guest form if user confirms
2. Optional: Telugu translations of the invitation text
