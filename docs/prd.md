# PRD: Pizza Shop Ordering System

## Problem Statement

ร้านพิซซ่าต้องการเว็บสั่งพิซซ่าที่ deploy ได้ง่ายบน Vercel โดยใช้ Next.js ลูกค้าต้องสามารถเลือกพิซซ่าจากเมนู 10 แบบ เลือก topping เพิ่มจาก 5 แบบ เลือกขนาดจาก 3 ขนาด เพิ่มสินค้าลงตะกร้า และตรวจสอบยอดรวมก่อนยืนยันคำสั่งซื้อได้ โดยไม่ต้องเชื่อมต่อ payment gateway จริง หน้าเว็บต้องรองรับ i18n 3 ภาษา ได้แก่ ไทย จีน และอังกฤษ เพื่อให้ลูกค้าต่างภาษาสามารถใช้งาน flow เดียวกันได้

## Solution

สร้างเว็บ Pizza Shop ด้วย Next.js เป็น single ordering experience ที่มี top navbar สำหรับนำทาง เลือกภาษา เมนูพิซซ่า ตะกร้า และ checkout flow แบบง่าย ลูกค้าเริ่มจากเลือกพิซซ่า เลือก topping เลือกขนาด ใส่ตะกร้า แล้วกดชำระเงินเพื่อเปิด modal สรุปรายการและยอดรวม

ระบบต้องมี localized UI copy และ localized menu content สำหรับ 3 ภาษา:

- Thai (`th`)
- Simplified Chinese (`zh`)
- English (`en`)

ระบบจะมีภาพประกอบสำหรับพิซซ่าแต่ละแบบทั้งหมด 10 ภาพ โดยใช้ asset ที่ generate ไว้ในโปรเจกต์เพื่อให้หน้าเมนูดูครบและพร้อม deploy โดยไม่พึ่ง image service ภายนอกใน runtime

## User Stories

1. As a customer, I want to see a top navbar, so that I can quickly access the menu and cart.
2. As a customer, I want to browse 10 pizza options, so that I can choose the pizza I want.
3. As a customer, I want each pizza option to show a generated image, name, description, and starting price, so that I can compare options visually.
4. As a customer, I want to select one pizza before choosing add-ons, so that the order flow is clear.
5. As a customer, I want to choose toppings from 5 available options, so that I can customize my pizza.
6. As a customer, I want to select multiple toppings, so that I can build the pizza I prefer.
7. As a customer, I want to choose from 3 pizza sizes, so that I can control portion size and price.
8. As a customer, I want the displayed item price to update after selecting size and toppings, so that I understand the cost before adding to cart.
9. As a customer, I want to add a configured pizza to the cart, so that I can continue shopping or checkout.
10. As a customer, I want to see the cart count in the top navbar, so that I know how many items I have selected.
11. As a customer, I want to open the cart from the navbar, so that I can review my selected pizzas.
12. As a customer, I want cart items to show pizza name, size, selected toppings, quantity, item price, and subtotal, so that the order is transparent.
13. As a customer, I want to increase or decrease quantity in the cart, so that I can adjust the order.
14. As a customer, I want to remove an item from the cart, so that I can correct mistakes.
15. As a customer, I want to see the cart total before checkout, so that I can confirm the amount.
16. As a customer, I want checkout to show a modal summary, so that I can review the final order without leaving the page.
17. As a customer, I want the modal to clearly state that payment is simulated, so that I do not expect a real payment flow.
18. As a customer, I want to confirm the order from the modal, so that the ordering journey has a clear completion state.
19. As a customer, I want to see an empty cart state, so that I know I need to add items before checkout.
20. As a mobile customer, I want the ordering flow to work on small screens, so that I can order from a phone.
21. As a Thai-speaking customer, I want to use the full ordering flow in Thai, so that I can order comfortably.
22. As a Simplified Chinese-speaking customer, I want to use the full ordering flow in Simplified Chinese, so that I can understand menu and checkout details.
23. As an English-speaking customer, I want to use the full ordering flow in English, so that I can understand menu and checkout details.
24. As a customer, I want to switch language from the top navbar, so that I can change language without searching through settings.
25. As a customer, I want pizza names, descriptions, toppings, sizes, cart labels, buttons, and modal text to match my selected language, so that the experience is consistent.
26. As a customer, I want my cart selections to remain intact when changing language, so that I do not lose my order.
27. As a shop owner, I want pizza, topping, size, and translation data to be easy to edit, so that menu changes are simple.
28. As a developer, I want the app to run without a backend database for the initial version, so that it can be deployed quickly to Vercel.
29. As a developer, I want deterministic price calculation, so that totals are reliable and testable.
30. As a developer, I want generated pizza images stored as static assets, so that Vercel deployment is predictable.

## Product Scope

### Pizza Menu

The initial menu includes 10 pizza options with mock demo pricing in THB:

| ID | English Name | Thai Name | Simplified Chinese Name | Base Price | Image Asset |
| --- | --- | --- | --- | ---: | --- |
| `margherita` | Margherita | มาร์เกอริตา | 玛格丽特披萨 | 199 | `/pizzas/margherita.webp` |
| `pepperoni` | Pepperoni | เปปเปอโรนี | 意式辣香肠披萨 | 239 | `/pizzas/pepperoni.webp` |
| `hawaiian` | Hawaiian | ฮาวายเอี้ยน | 夏威夷披萨 | 229 | `/pizzas/hawaiian.webp` |
| `bbq-chicken` | BBQ Chicken | บาร์บีคิวชิกเกน | 烧烤鸡肉披萨 | 259 | `/pizzas/bbq-chicken.webp` |
| `seafood-deluxe` | Seafood Deluxe | ซีฟู้ดดีลักซ์ | 豪华海鲜披萨 | 299 | `/pizzas/seafood-deluxe.webp` |
| `veggie-garden` | Veggie Garden | เวจจี้การ์เดน | 田园蔬菜披萨 | 219 | `/pizzas/veggie-garden.webp` |
| `four-cheese` | Four Cheese | โฟร์ชีส | 四重芝士披萨 | 249 | `/pizzas/four-cheese.webp` |
| `meat-lovers` | Meat Lovers | มีทเลิฟเวอร์ส | 肉食爱好者披萨 | 289 | `/pizzas/meat-lovers.webp` |
| `truffle-mushroom` | Truffle Mushroom | ทรัฟเฟิลมัชรูม | 松露蘑菇披萨 | 319 | `/pizzas/truffle-mushroom.webp` |
| `spicy-thai-basil` | Spicy Thai Basil | สไปซี่กะเพรา | 泰式辣罗勒披萨 | 269 | `/pizzas/spicy-thai-basil.webp` |

Each pizza has:

- Stable id
- Localized name
- Localized description
- Base price
- Generated image asset
- Optional recommended topping ids

Pizza descriptions should be localized in Thai, Simplified Chinese, and English. For the demo, descriptions can be short marketing copy stored in message dictionaries.

### Toppings

The initial topping options include 5 toppings with mock demo pricing in THB:

| ID | English Name | Thai Name | Simplified Chinese Name | Price |
| --- | --- | --- | --- | ---: |
| `extra-cheese` | Extra cheese | เพิ่มชีส | 加芝士 | 35 |
| `pepperoni` | Pepperoni | เปปเปอโรนี | 意式辣香肠 | 45 |
| `mushroom` | Mushroom | เห็ด | 蘑菇 | 30 |
| `bacon` | Bacon | เบคอน | 培根 | 45 |
| `pineapple` | Pineapple | สับปะรด | 菠萝 | 25 |

Each topping has:

- Stable id
- Localized name
- Price

### Sizes

The app supports 3 sizes with mock demo price adjustments in THB:

| ID | English Name | Thai Name | Simplified Chinese Name | Price Adjustment |
| --- | --- | --- | --- | ---: |
| `small` | Small | เล็ก | 小号 | 0 |
| `medium` | Medium | กลาง | 中号 | 60 |
| `large` | Large | ใหญ่ | 大号 | 110 |

Each size has:

- Stable id
- Localized display name
- Fixed size adjustment

Demo pricing model:

- Unit price = pizza base price + size adjustment + selected topping prices.
- Line subtotal = unit price x quantity.
- Grand total = sum of all line subtotals.
- Currency is THB for all locales.
- No tax, discount, service charge, or delivery fee in v1.

### Pizza Customization Form

The customization form appears after a customer selects a pizza. The form includes:

- Selected pizza summary with localized name, image, base price, and short description.
- Topping multi-select with exactly 5 checkbox or selectable-chip options.
- Size single-select with exactly 3 segmented-control or radio options.
- Quantity stepper with minimum quantity `1`.
- Live unit price preview.
- Add to cart button.

Default form state:

- No toppings selected.
- Size defaults to `medium`.
- Quantity defaults to `1`.
- Add to cart is disabled until a pizza is selected.

### Internationalization

The app supports 3 locales:

1. Thai (`th`)
2. Simplified Chinese (`zh`)
3. English (`en`)

Localized content includes:

- Navbar labels
- Language switcher labels
- Pizza names and descriptions
- Topping names
- Size names
- Add to cart controls
- Cart empty state
- Cart item labels
- Quantity controls
- Checkout button
- Checkout modal title, summary labels, total labels, simulated payment copy, confirm button, and success message

Locale behavior:

- Default locale should be Thai (`th`) unless browser detection or deployment configuration chooses another locale.
- Users can switch locale from the top navbar.
- Switching locale must not clear the cart or reset the currently configured pizza unless the implementation explicitly reloads by route and restores state.
- Currency remains THB across all locales for v1.
- Number and currency formatting should use the active locale where practical, while keeping the same underlying prices.

### UI Component Strategy

The demo implementation should use Tailwind CSS for UI components and styling:

- Use Tailwind CSS as the primary UI approach for the Vercel demo.
- Build reusable local components for repeated controls such as buttons, cards, modal, language switcher, size selector, topping selector, and quantity stepper.
- Ant Design remains acceptable as a later alternative, but should not be mixed into the demo unless the team explicitly changes the UI decision.
- The visual direction should feel like a consumer pizza ordering site, not an admin dashboard.

## User Flow

1. Customer opens the Pizza Shop homepage.
2. Customer sees a top navbar with brand/menu link and cart button.
3. Customer optionally switches language between Thai, Simplified Chinese, and English from the top navbar.
4. Customer browses the 10 pizza options in the active language.
5. Customer selects one pizza.
6. Customer chooses toppings from the 5 topping options.
7. Customer chooses one of the 3 sizes.
8. Customer reviews the calculated item price.
9. Customer clicks add to cart.
10. Cart count updates in the top navbar.
11. Customer opens the cart.
12. Customer reviews items and total in the active language.
13. Customer clicks checkout.
14. App opens a modal with order summary and grand total in the active language.
15. Customer confirms simulated payment.
16. App shows order success state and clears the cart.

## Implementation Decisions

- Build with Next.js using the App Router to keep routing and Vercel deployment straightforward.
- Implement i18n with locale-aware routing or a Next.js-compatible i18n library so Thai, Simplified Chinese, and English routes/content are explicit and deployable on Vercel.
- Use Tailwind CSS for the demo UI and keep styling consistent across navbar, menu cards, cart, and checkout modal.
- Keep the initial app client-side for cart interactions because the first version does not require authentication, database writes, or real payment processing.
- Store menu, topping, size, and translation data in typed local constants or message dictionaries so the app remains easy to maintain without a CMS.
- Model the cart as client state containing configured pizza items, including pizza id, size id, topping ids, quantity, unit price, and subtotal.
- Use a top navbar with language switcher, cart button, and visible item count.
- Keep cart state independent from localized display strings by storing stable ids, then resolving translated labels at render time.
- Use a menu grid for the 10 pizza options, responsive from mobile to desktop.
- Use local Tailwind-styled component primitives: cards for pizza items, checkbox or selectable chips for toppings, segmented controls or radio buttons for size, badge for cart count, drawer or section for cart, and modal for checkout summary.
- Use a product customizer panel or section after pizza selection to enforce the flow: pizza first, toppings second, size third, add to cart last.
- Use a checkout modal for final order summary instead of routing to a separate payment page.
- Payment confirmation is simulated and must not collect credit card, banking, or sensitive payment information.
- Generate one static image per pizza option and store the assets in the project so the production build does not depend on remote image generation.
- Store generated pizza images as square WebP or PNG assets under `public/pizzas/`, matching the image paths in the pizza data table.
- Use accessible modal behavior: focus trap, close button, escape key close, and clear modal title.
- Use currency display consistently. Default currency for v1 should be THB unless the implementation team chooses otherwise before build.
- Ensure UI layout can handle longer translated text without clipping or overlapping, especially navbar controls, pizza cards, cart rows, and modal actions.

## Suggested Pages And Components

Although the user experience can fit on one route, the app should be componentized around these product surfaces:

- Home/menu page
- Top navbar
- Language switcher
- Pizza menu grid
- Pizza card
- Pizza customizer
- Topping selector
- Size selector
- Quantity stepper
- Cart drawer or cart section
- Checkout summary modal
- Order success state

## Testing Decisions

- Test price calculation as pure behavior: given pizza, toppings, size, and quantity, the function returns the correct unit price and subtotal.
- Test cart behavior through user actions: add item, update quantity, remove item, clear cart after simulated checkout.
- Test checkout behavior: checkout is blocked for an empty cart, opens a modal for a non-empty cart, displays correct totals, and confirms simulated payment.
- Test i18n behavior: Thai, Simplified Chinese, and English render expected key labels and the order flow remains usable in each locale.
- Test language switching behavior: switching language preserves cart items and recalculates displayed labels from stable ids.
- Test responsive navigation at a high level: menu and cart controls remain reachable on mobile and desktop.
- Test translated text at representative mobile and desktop widths to catch clipping or overlapping.
- Test UI controls through accessible roles and visible labels where possible.
- Prefer React Testing Library for component behavior and Playwright for one end-to-end ordering path once the Next.js app exists.
- Do not test implementation details such as internal state variable names or component-private helpers.

## Acceptance Criteria

- App is implemented in Next.js and can be deployed on Vercel.
- UI is built with Tailwind CSS and uses local reusable components consistently.
- Top navbar is visible and includes language switching, cart access, and item count.
- App supports Thai, Simplified Chinese, and English.
- Customer can switch between Thai, Simplified Chinese, and English from the navbar.
- Switching language does not clear the cart.
- Core UI copy, menu content, cart content, and checkout modal content are localized for all 3 languages.
- Menu shows exactly 10 pizza options.
- Each pizza option has a generated image.
- Customer can select a pizza, choose toppings, choose size, and add the configured item to cart.
- Topping selector offers exactly 5 toppings.
- Size selector offers exactly 3 sizes.
- Quantity control defaults to 1 and does not allow a quantity below 1.
- Price preview updates correctly from mocked pizza base price, selected toppings, selected size, and quantity.
- Cart displays selected items, quantities, item details, subtotals, and grand total.
- Checkout opens a modal summary rather than using a real payment gateway.
- Modal shows final total and simulated payment confirmation.
- Confirming checkout clears the cart and shows a success state.
- App works on mobile and desktop viewport sizes.
- Translated text does not visibly clip or overlap in navbar, menu cards, cart, or checkout modal.

## Out of Scope

- Real payment gateway integration
- User login or account management
- Backend order persistence
- Admin menu management
- Delivery address validation
- Promotions, coupons, loyalty points, or tax rules
- Inventory management
- Multi-branch store selection
- Real-time kitchen/order status tracking
- Full legal translation review or market-specific localization beyond Thai, Simplified Chinese, and English UI copy

## Further Notes

- The first implementation should optimize for a polished demo and clean deployability rather than backend completeness.
- If real orders are needed later, the likely next step is adding an order API, database persistence, and a real checkout provider.
- Generated pizza image prompts should use a consistent visual style so the menu feels cohesive.
- Chinese copy uses Simplified Chinese for v1.
