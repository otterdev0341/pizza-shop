# Implementation Plan: Pizza Shop Demo

## Goal

Build a demo-ready Pizza Shop web app with Next.js, Tailwind CSS, i18n support for Thai, Simplified Chinese, and English, a configurable pizza ordering flow, cart, and simulated checkout modal.

## Demo Decisions

- Framework: Next.js App Router
- Styling: Tailwind CSS
- Deployment target: Vercel
- Locales: Thai (`th`), Simplified Chinese (`zh`), English (`en`)
- Default locale: Thai (`th`)
- Currency: THB
- Payment: simulated checkout only
- Images: static generated WebP or PNG assets under `public/pizzas/`
- Persistence: client-side cart state only for demo

## Phase 1: Project Setup

1. Initialize the Next.js app with TypeScript.
2. Add Tailwind CSS and configure global styles.
3. Add base app layout with responsive page shell.
4. Add static asset directory for pizza images.
5. Add linting and formatting scripts if the generated project does not include them.

Deliverable:

- App boots locally.
- Tailwind styles render correctly.
- Project can build with `npm run build`.

## Phase 2: Domain Data And Pricing

Create typed local data for:

- 10 pizzas
- 5 toppings
- 3 sizes
- localized labels and descriptions
- static image paths

Use a lightweight repository/DTO/service separation:

- DTO layer defines the shape of catalog, locale, cart item, and cart line data.
- Repository layer owns static mock catalog data, translations, and lookup methods.
- Pricing service owns price formatting, unit price, line subtotal, and cart total calculations.
- UI components consume repository/service APIs instead of importing raw mock arrays directly.

Pricing rules:

- Unit price = pizza base price + size adjustment + selected topping prices.
- Line subtotal = unit price x quantity.
- Grand total = sum of line subtotals.
- No tax, delivery fee, discount, or payment fee for v1.

Mock demo prices:

| Pizza ID | Base Price |
| --- | ---: |
| `margherita` | 199 |
| `pepperoni` | 239 |
| `hawaiian` | 229 |
| `bbq-chicken` | 259 |
| `seafood-deluxe` | 299 |
| `veggie-garden` | 219 |
| `four-cheese` | 249 |
| `meat-lovers` | 289 |
| `truffle-mushroom` | 319 |
| `spicy-thai-basil` | 269 |

| Topping ID | Price |
| --- | ---: |
| `extra-cheese` | 35 |
| `pepperoni` | 45 |
| `mushroom` | 30 |
| `bacon` | 45 |
| `pineapple` | 25 |

| Size ID | Adjustment |
| --- | ---: |
| `small` | 0 |
| `medium` | 60 |
| `large` | 110 |

Deliverable:

- Data is centralized and typed.
- Pricing function is pure and covered by focused tests if test setup exists.

## Phase 3: Internationalization

1. Add locale-aware routing or a Next.js-compatible i18n library.
2. Create dictionaries for `th`, `zh`, and `en`.
3. Localize navbar, language switcher, pizza names, descriptions, toppings, sizes, cart labels, buttons, modal copy, and success state.
4. Add language switcher in the top navbar.
5. Ensure language switching does not clear cart state.

Deliverable:

- User can switch Thai, Simplified Chinese, and English from the navbar.
- The ordering flow remains usable in every locale.

## Phase 4: Core UI Components

Build Tailwind-styled local components:

- Top navbar
- Language switcher
- Pizza card
- Pizza menu grid
- Pizza customizer
- Topping selector
- Size selector
- Quantity stepper
- Cart button with badge
- Cart drawer or cart section
- Checkout modal
- Order success state

UI expectations:

- Consumer pizza ordering feel.
- Responsive layout for mobile and desktop.
- Text must not clip or overlap in Thai, Simplified Chinese, or English.
- Repeated controls should use shared local components.

Deliverable:

- Static page renders full menu with 10 pizza cards.
- Layout is responsive before cart behavior is wired.

## Phase 5: Ordering Flow

Implement the customer flow:

1. Select pizza.
2. Choose toppings.
3. Choose size.
4. Set quantity.
5. See live price preview.
6. Add configured pizza to cart.
7. Open cart from navbar.
8. Update quantity or remove item.
9. Review grand total.
10. Open checkout modal.
11. Confirm simulated payment.
12. Clear cart and show success state.

Cart state shape should store stable ids, not translated display strings:

- pizza id
- topping ids
- size id
- quantity
- unit price at calculation time
- subtotal

Deliverable:

- A complete happy-path demo order can be performed without backend or payment integration.

## Phase 6: Generated Pizza Images

Generate or provide one static image per pizza:

- `/pizzas/margherita.webp`
- `/pizzas/pepperoni.webp`
- `/pizzas/hawaiian.webp`
- `/pizzas/bbq-chicken.webp`
- `/pizzas/seafood-deluxe.webp`
- `/pizzas/veggie-garden.webp`
- `/pizzas/four-cheese.webp`
- `/pizzas/meat-lovers.webp`
- `/pizzas/truffle-mushroom.webp`
- `/pizzas/spicy-thai-basil.webp`

Image requirements:

- Square aspect ratio.
- Consistent visual style.
- Clear top-down or three-quarter pizza view.
- Optimized enough for Vercel demo performance.

Deliverable:

- Every pizza card displays its matching static image.

## Phase 7: Verification

Minimum checks:

1. `npm run lint`
2. `npm run build`
3. Manual happy path in Thai
4. Manual happy path in Simplified Chinese
5. Manual happy path in English
6. Mobile viewport check
7. Desktop viewport check

Behavior to verify:

- Menu has exactly 10 pizzas.
- Toppings have exactly 5 options.
- Sizes have exactly 3 options.
- Quantity cannot go below 1.
- Price preview updates when size, toppings, or quantity changes.
- Cart count updates after adding items.
- Cart preserves item ids and re-renders translated labels after language switch.
- Checkout modal shows item summary and grand total.
- Simulated checkout clears the cart and shows success state.

Deliverable:

- Demo can be shown locally and deployed to Vercel.

## Phase 8: Vercel Deployment

1. Confirm production build passes.
2. Ensure static pizza images are included in the build.
3. Deploy to Vercel.
4. Smoke test the deployed URL in all 3 locales.

Deliverable:

- Public Vercel demo URL.

## Out Of Scope For Implementation Demo

- Real payment gateway
- Backend order persistence
- Authentication
- Admin panel
- Delivery address validation
- Taxes, discounts, coupons, and promotions
- Translation legal review
