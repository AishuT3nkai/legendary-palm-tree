# Leaf Store — AI Engineering Workflow

## Project

**Leaf Store** is a Roblox digital-services storefront.

Repository: `AishuT3nkai/legendary-palm-tree`  
Default branch: `main`

GitHub is the **source of truth** for project files and implementation state.

---

## AI Team

### ChatGPT — Lead Engineer

Primary responsibilities:

- Project architecture
- Requirements and product logic
- GitHub implementation
- Frontend/backend integration
- Debugging
- Security architecture
- Data flow and API design
- Repository organization
- Technical decisions and final integration

ChatGPT should make changes directly when the required GitHub access is available.

### Claude — UI/UX + Secondary Engineer

Primary responsibilities:

- UI/UX review
- Visual design refinement
- Frontend code review
- Accessibility review
- Responsive/mobile review
- Component and interaction suggestions
- Identifying visual inconsistencies
- Reviewing implementation quality

Claude should not replace existing project architecture without a clear reason.

### DeepSeek — Independent Auditor

Primary responsibilities:

- Security audit
- Dependency audit
- Suspicious-code detection
- Secret/API-key detection
- XSS/injection review
- Authentication/authorization review
- Admin/public separation review
- Open-source provenance review
- Obfuscation/backdoor review

DeepSeek is an independent reviewer. It should not assume another AI's implementation is correct.

---

## Project Rules

1. GitHub is the source of truth.
2. Do not place secrets, API keys, tokens, passwords, or private credentials in public frontend code.
3. Public frontend code must not contain privileged admin operations.
4. Admin functionality must use server-side authentication and authorization.
5. Do not create hidden admin endpoints.
6. Do not add unnecessary dependencies.
7. Every new dependency must have a clear purpose.
8. Do not copy proprietary code.
9. Do not blindly paste code from tutorials, repositories, or component libraries.
10. External components may be used as design references, but implementation should be adapted to Leaf Store.
11. Do not introduce obfuscated JavaScript or suspicious encoded payloads.
12. Avoid third-party scripts unless they are necessary and trusted.
13. Keep the public storefront and admin system logically separated.
14. Mobile-first behavior is required.
15. Do not use emoji as UI icons. Use SVG, CSS, or proper image assets.
16. Keep the visual language consistent across pages.
17. Do not silently change product prices or business rules.
18. Do not remove existing functionality without documenting the reason.
19. Do not claim a feature is production-ready until it has actually been implemented and tested.
20. Do not claim a security audit has been completed unless an actual audit was performed.

---

## Current Public Store Structure

The public site currently targets:

- Home / Beranda
- Robux
- Gamepass
- Blox Fruits Joki
- Cek Pesanan
- Bantuan

Home contains:

- Hero
- Service/product highlights
- Statistics
- Ulasan
- Support/WhatsApp section
- FAQ at the bottom

Ulasan is a Home section, not a separate page.

FAQ belongs at the bottom of Home.

---

## Checkout V1

V1 does **not** use a payment gateway.

Checkout flow:

1. Customer selects a service.
2. Customer enters Roblox username.
3. Customer enters phone number.
4. Customer enters service-specific information.
5. Site calculates the displayed total.
6. Site generates an Order ID.
7. Customer is redirected to WhatsApp with a prefilled order message.
8. Payment instructions are handled through WhatsApp.
9. Order status is initially confirmed through WhatsApp.

WhatsApp destination:

`+62 831-8305-0325`

Do not expose private admin credentials through this flow.

---

## Product Rules

Prices are denominated in Indonesian Rupiah (IDR).

Current core prices include:

- Robux: Rp14,000 / 100 Robux
- Gamepass: Rp14,000 / 100 Robux

Blox Fruits joki prices are maintained from the project requirements and must not be invented or silently changed.

The customer-facing site should not expose internal work methods such as whether a worker performs a task manually or through an internal tool.

Customer-facing wording should focus on:

- service
- requirements
- estimated time
- queue
- account conditions
- applicable terms

---

## Account Collision Policy

Customer-facing joki checkout must clearly communicate:

**ACCOUNT COLLISION POLICY**

Do not log in to or play the account while the joki service is being performed.

If an account collision interrupts the service, the service may be considered completed/forfeited according to the store terms and may not be refundable.

---

## Design Direction

Primary reference for information architecture:

TokoBux.

Additional design references:

- ui-ux-pro-max
- 21st.dev community components

These are references, not sources for blindly copying code.

Leaf Store should use:

- dark modern interface
- green Leaf Store accent
- layered surfaces
- strong typography
- restrained glow
- clean cards
- bento-style layouts where appropriate
- responsive mobile layouts
- inline SVG/CSS icons instead of emoji
- minimal visual clutter

The design should feel like a real gaming-commerce product, not an AI-generated template.

---

## Engineering Workflow

### Before changing code

1. Inspect the existing implementation.
2. Identify dependencies and related files.
3. Confirm the requested behavior.
4. Check whether the feature already exists.
5. Avoid rewriting unrelated sections.

### During implementation

1. Make the smallest coherent change.
2. Preserve existing working functionality.
3. Keep security boundaries intact.
4. Keep mobile behavior in mind.
5. Avoid unnecessary libraries.
6. Use semantic HTML and accessible controls where applicable.

### After implementation

1. Inspect the changed files.
2. Check for broken references.
3. Check for missing assets.
4. Check JavaScript syntax/logic.
5. Check responsive behavior.
6. Check for accidentally exposed secrets.
7. Check that links and forms point to the intended destinations.
8. Document significant architectural changes.

---

## Review Protocol

For significant changes:

### ChatGPT

Implement and perform the first technical review.

### Claude

Review:

- visual hierarchy
- UX
- responsive layout
- component consistency
- frontend quality
- accessibility

### DeepSeek

Review independently for:

- security
- suspicious code
- secrets
- dependencies
- injection risks
- authentication/authorization
- admin exposure
- copied or suspicious source patterns

### Final integration

ChatGPT integrates accepted findings into the repository.

The user remains the final decision-maker for product behavior, design direction, pricing, and deployment.

---

## Git Discipline

Use descriptive commit messages.

Preferred format:

- `feat: add ...`
- `fix: resolve ...`
- `refactor: simplify ...`
- `style: improve ...`
- `security: harden ...`
- `docs: update ...`

Do not make unrelated changes in the same commit when avoidable.

Never commit:

- API keys
- access tokens
- passwords
- private credentials
- local environment files containing secrets
- customer private data

---

## Current V1 Boundary

The current static storefront is not automatically considered a complete production backend.

Features such as:

- real database persistence
- secure admin authentication
- server-side order management
- payment processing
- worker management
- automated order status
- production-grade API authorization

must be explicitly implemented before being described as production features.

---

## AI Handoff Format

When handing work to another AI, include:

**Task:**  
What needs to change.

**Current state:**  
What already exists.

**Files involved:**  
Exact paths.

**Constraints:**  
Security, UX, business, or technical requirements.

**Do not change:**  
Anything that must remain untouched.

**Acceptance criteria:**  
How to determine that the task is complete.

**Known issues:**  
Existing problems relevant to the task.

This prevents each AI from rebuilding the project from scratch.

---

## Important

The goal is not to make three AIs independently rewrite Leaf Store.

The goal is:

**one shared repository + specialized reviewers + controlled integration.**

ChatGPT owns the primary engineering integration.  
Claude specializes in UI/UX and secondary frontend review.  
DeepSeek provides independent auditing.

All AI-generated changes must be treated as proposals until they have been reviewed and integrated into the actual repository.
