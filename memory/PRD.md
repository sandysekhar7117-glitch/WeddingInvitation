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

## Backlog
- P1: RSVP / guest wishes form (needs backend + MongoDB)
- P1: Photo gallery of the couple
- P2: Multi-language toggle (Telugu / English)
- P2: Optimized/compressed video1 for faster first load (currently 28 MB)
- P2: OG share image + meta tags for rich WhatsApp preview

## Next Tasks
1. Ask user if RSVP form is wanted
2. Compress video1.mp4 with ffmpeg if available
3. Add OG meta tags for link previews
