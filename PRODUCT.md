# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: the Dentika clinic owner/decision-maker — the actual person evaluating this page right now — who judges this landing page as a sales demo to decide whether to hire the developer for their real site. They read every section as "would this convince my patients, and would I trust this developer with my clinic's real site."

Simulated, not primary: prospective patients of Dentika (adults and children needing dental care — surgery, orthodontics, prosthetics, implantation, pediatric dentistry) who would book an appointment online on the real, future version of this site. The page must demonstrate a convincing patient experience (services, doctors, ratings, real booking) so the owner can judge it, but the owner's evaluation is what the design optimizes for today.

## Product Purpose

A single-page landing site built as a sales demo to win Dentika as a paying client for a solo vibe-coding freelance practice that builds landing pages for local service businesses. It demonstrates, for the clinic owner, what a real patient-facing booking page for Dentika would look like — services, doctors, third-party ratings, and a live-feeling appointment calendar.

## Positioning

Differentiates from other Kazan dental-clinic sites (per the competitor research process in `../research-result.md` and `_templates/market-research-template.md`) by publishing information competitors typically hide or omit: open service pricing (not "price on request"), a real-time booking calendar with actual open/taken slots (not just a "leave a request" form), and doctor credential proof (diploma scan chip) placed directly next to each doctor card. No researched competitor combines all three.

## Operating Context

- Single-file HTML mockup (`design/concept-v3-standard.html`) — vanilla CSS/JS, no build step, no framework. This is a concept-evaluation artifact, not the production codebase; a real build (Astro + Tailwind, matching the sibling `dentika-kazan-demo` repo's `main` branch) happens after a palette is chosen and the client approves.
- Ships four palette variants (mint/ultramarine/pine/plum) behind an in-page review toolbar, switchable live or pinned via `?p=<palette>`. Block content, structure, and copy are identical across all four — only color differs. This is a deliberate evaluation state, not a bug: a palette has not yet been chosen.
- Booking form and calendar are a visual simulation only — no real data is submitted while the site is in pre-sale/demo stage (see `../../_templates/legal-compliance-ru.md`; once real, 152-FZ operator responsibility sits with the clinic as data operator, not the developer).
- Governed throughout by ст. 24 ФЗ "О рекламе" №38-ФЗ (medical advertising): a visible contraindication/consult-a-specialist disclaimer must stay present, and no text anywhere (hero, services, doctors, captions) may use superlatives, competitor comparisons, or treatment-result guarantees.
- Photography is restricted project-wide to no human or animal faces; permitted subjects are treatment rooms, equipment, signage/reception, documents/diplomas, and before/after photos of teeth/mouth only.

## Capabilities and Constraints

Confirmed real facts (must be preserved, not treated as placeholders):
- Real clinic: Dentika, Kazan.
- Real address: ул. Генерала Махмута Гареева, 9/1, оф. 1102 (Салават Купере, Кировский р-н), Казань.
- Real phone: +7 (910) 286-67-67.
- Real third-party ratings, linked to Dentika's actual listings: 2ГИС 4.9 (81 оценок), Яндекс.Карты 5.0 (45 оценок).
- Real photos of this clinic: treatment room, corridor/waiting area, reception desk, reception + signage, map location (see `photos/`).
- Real service-line list, sourced from Dentika's public 2ГИС card.

Explicitly undecided, currently placeholder, and must not be presented as fact until the clinic supplies real data:
- License number (shown as "уточняется").
- Doctor roster: names, exact experience, and photos are demo placeholders, visibly marked "(демо-имя)".
- Service prices: not published anywhere publicly, so shown as "по записи" rather than invented figures.

Hard constraint: the booking flow must keep working as a demo (no backend submission) until the client relationship and data-processing agreement are in place.

## Brand Commitments

- Name: Dentika.
- Visual identity: **undecided, in evaluation.** The prior "Досье/Ledger" concept (ink/bg/teal/gold/slate/brick, Bitter + IBM Plex Mono + PT Sans, 2px radius, hairline borders — see `dentika-kazan-demo` repo's `main` branch) shipped as the site's `main` branch and is not binding here; `v3-concept` is a deliberate replacement direction, "Категorийный стандарт" (federal-medtech craft bar), built via Impeccable's direction-roll process — see `.impeccable/surfaces/design-concept-v3-standard-html.md` for the recorded direction contract (thesis, own-world, seed key). Confirmed rejected: cream+terracotta, dark+neon, uniform 8–16px rounded cards with shared gray shadow, default UI fonts (Inter/Poppins/Manrope), arrow after button/link text — see `design-guidelines-v1.md` for the historical record (superseded by this direction, kept as protocol of what was agreed at the time, not edited retroactively).
- No DESIGN.md exists yet for this direction. It is written only after a palette is chosen (`/impeccable document`, run against the settled world) — writing it against four live palettes would describe an unsettled state as if it were final.

## Evidence on Hand

- Real clinic photos: `photos/` in this worktree (kabinet-4.png, kabinet-4-hall.png, reception-desk.png, reception-logo.png, map-location.png).
- Real ratings and listing links: 2ГИС and Яндекс.Карты Dentika org pages (linked from the hero section).
- Real address and phone (see Capabilities and Constraints).
- Competitor research: `../research-result.md` covers the broader Kazan dental market for positioning/differentiators; it does not itself reference Dentika. **Never commit this file or its contents to git, in any repository — it is the freelancer's own competitive-research asset, not project deliverable content.**
- Absent — do not fabricate: real license number, real doctor roster/credentials, real published price list, testimonials or case studies beyond the aggregate ratings above.

## Product Principles

1. Truthfulness over polish: placeholder data (doctor names, license number, prices) is never presented as real; it stays visibly marked "демо" until Dentika supplies the real facts.
2. Differentiate through disclosure: the site's edge is showing information (prices, real slots, credentials) competing clinics' sites hide — preserve this whenever services, booking, or doctors sections change.
3. Optimize for the owner's judgment: the clinic owner is the real, present-day audience — every section must read as convincing proof of craft and of a working patient experience, since that judgment decides whether the real site gets built.
4. Compliance is non-negotiable: every text change is checked against ст. 24 ФЗ "О рекламе" (no superlatives, no competitor comparisons, no result guarantees), and the contraindication disclaimer stays present and legible.
5. No faces, ever: photography stays limited to spaces/equipment/documents/teeth, even as more real clinic photos are added.
6. Palette parity while undecided: any change to structure, copy, or a component must be applied identically across all four palette variants — the point of the four-way split is that only color differs.
