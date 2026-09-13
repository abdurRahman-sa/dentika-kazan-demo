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

- Single-page landing (anchor navigation via a left rail on desktop / horizontal scroll on mobile, no multi-page routing), built with Astro + Tailwind CSS.
- Booking form and calendar are a visual simulation only — no real data is submitted while the site is in pre-sale/demo stage (see `../../_templates/legal-compliance-ru.md`; once real, 152-FZ operator responsibility sits with the clinic as data operator, not the developer).
- Governed throughout by ст. 24 ФЗ "О рекламе" №38-ФЗ (medical advertising): a visible contraindication/consult-a-specialist disclaimer must stay present (currently the fixed `LegalBar`), and no text anywhere (hero, services, doctors, captions) may use superlatives, competitor comparisons, or treatment-result guarantees.
- Photography is restricted project-wide to no human or animal faces; permitted subjects are treatment rooms, equipment, signage/reception, documents/diplomas, and before/after photos of teeth/mouth only.

## Capabilities and Constraints

Confirmed real facts (must be preserved, not treated as placeholders):
- Real clinic: Dentika, Kazan.
- Real address: ул. Генерала Махмута Гареева, 9/1, оф. 1102 (Салават Купере, Кировский р-н), Казань.
- Real phone: +7 (910) 286-67-67.
- Real third-party ratings, linked to Dentika's actual listings: 2ГИС 4.9 (81 оценок), Яндекс.Карты 5.0 (45 оценок).
- Real photos of this clinic: treatment room, corridor/waiting area, reception desk, reception + signage, map location.
- Real service-line list, sourced from Dentika's public 2ГИС card (see `Services.astro`).

Explicitly undecided, currently placeholder, and must not be presented as fact until the clinic supplies real data:
- License number (shown as "уточняется").
- Doctor roster: names, exact experience, and photos are demo placeholders, visibly marked "(демо-имя)".
- Service prices: not published anywhere publicly, so shown as "по записи" rather than invented figures.

Hard constraint: the booking flow must keep working as a demo (no backend submission) until the client relationship and data-processing agreement are in place.

## Brand Commitments

- Name: Dentika.
- Visual identity: new design system in progress — see `../design-system.md`. The current site markup predates it and is not a visual reference.

## Evidence on Hand

- Real clinic photos: `dental-kazan/dentika/photos/` and `dental-kazan/site/public/photos/` (kabinet-4.png, kabinet-4-hall.png, reception-desk.png, reception-logo.png, map-location.png).
- Real ratings and listing links: 2ГИС and Яндекс.Карты Dentika org pages (linked from `Hero.astro`).
- Real address and phone (see Capabilities and Constraints).
- Competitor research: `dental-kazan/research-result.md` covers the broader Kazan dental market for positioning/differentiators; it does not itself reference Dentika.
- Absent — do not fabricate: real license number, real doctor roster/credentials, real published price list, testimonials or case studies beyond the aggregate ratings above.

## Product Principles

1. Truthfulness over polish: placeholder data (doctor names, license number, prices) is never presented as real; it stays visibly marked "демо" until Dentika supplies the real facts.
2. Differentiate through disclosure: the site's edge is showing information (prices, real slots, credentials) competing clinics' sites hide — preserve this whenever services, booking, or doctors sections change.
3. Optimize for the owner's judgment: the clinic owner is the real, present-day audience — every section must read as convincing proof of craft and of a working patient experience, since that judgment decides whether the real site gets built.
4. Compliance is non-negotiable: every text change is checked against ст. 24 ФЗ "О рекламе" (no superlatives, no competitor comparisons, no result guarantees), and the contraindication disclaimer stays present and legible.
5. No faces, ever: photography stays limited to spaces/equipment/documents/teeth, even as more real clinic photos are added.
