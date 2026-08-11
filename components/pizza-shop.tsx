"use client";

import { useEffect, useMemo, useState } from "react";
import type { CartItemDto, Locale, PizzaDto, SizeDto } from "../lib/dto/shop.dto";
import { shopRepository } from "../lib/repositories/shop.repository";
import { calculateCartTotal, calculateUnitPrice, formatPrice } from "../lib/services/pricing.service";

type PizzaShopProps = {
  initialLocale: Locale;
};

const localeLabels: Record<Locale, string> = {
  th: "ไทย",
  zh: "中文",
  en: "EN"
};

const supportedLocales = shopRepository.getLocales();
const pizzaCatalog = shopRepository.getPizzas();
const toppingCatalog = shopRepository.getToppings();
const sizeCatalog = shopRepository.getSizes();

export function PizzaShop({ initialLocale }: PizzaShopProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [selectedPizzaId, setSelectedPizzaId] = useState(pizzaCatalog[0]?.id ?? "");
  const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>([]);
  const [selectedSizeId, setSelectedSizeId] = useState<SizeDto["id"]>("medium");
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItemDto[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const t = shopRepository.getMessages(locale);
  const selectedPizza = shopRepository.getPizzaById(selectedPizzaId) ?? pizzaCatalog[0]!;
  const unitPrice = calculateUnitPrice(selectedPizza.id, selectedSizeId, selectedToppingIds);
  const previewTotal = unitPrice * quantity;
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = calculateCartTotal(cartItems);

  const cartLines = useMemo(() => {
    return cartItems.map((item) => {
      const pizza = shopRepository.getPizzaById(item.pizzaId);
      const size = shopRepository.getSizeById(item.sizeId);
      const selectedToppings = item.toppingIds
        .map((id) => shopRepository.getToppingById(id))
        .filter((topping) => topping !== undefined);
      const lineUnitPrice = calculateUnitPrice(item.pizzaId, item.sizeId, item.toppingIds);

      return {
        ...item,
        pizza,
        size,
        selectedToppings,
        unitPrice: lineUnitPrice,
        subtotal: lineUnitPrice * item.quantity
      };
    });
  }, [cartItems]);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.history.replaceState(null, "", `/${locale}`);
  }, [locale]);

  function toggleTopping(toppingId: string) {
    setSelectedToppingIds((current) =>
      current.includes(toppingId) ? current.filter((id) => id !== toppingId) : [...current, toppingId]
    );
  }

  function addToCart() {
    const itemKey = [selectedPizza.id, selectedSizeId, [...selectedToppingIds].sort().join(".")].join("|");
    setCartItems((current) => {
      const existing = current.find((item) => item.id === itemKey);
      if (existing) {
        return current.map((item) => (item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item));
      }
      return [
        ...current,
        {
          id: itemKey,
          pizzaId: selectedPizza.id,
          sizeId: selectedSizeId,
          toppingIds: [...selectedToppingIds],
          quantity
        }
      ];
    });
    setSuccessMessage("");
  }

  function changeCartQuantity(itemId: string, nextQuantity: number) {
    if (nextQuantity < 1) return;
    setCartItems((current) => current.map((item) => (item.id === itemId ? { ...item, quantity: nextQuantity } : item)));
  }

  function removeCartItem(itemId: string) {
    setCartItems((current) => current.filter((item) => item.id !== itemId));
  }

  function confirmOrder() {
    setCartItems([]);
    setIsCheckoutOpen(false);
    setSuccessMessage(t.success);
  }

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a className="flex items-center gap-2 font-bold text-tomato-700" href="#menu" aria-label={t.navMenu}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-tomato-500 text-lg text-white">P</span>
            <span className="text-lg">{t.brand}</span>
          </a>
          <div className="flex min-w-0 items-center gap-2">
            <div className="hidden text-sm font-medium text-stone-500 sm:block">{t.language}</div>
            <div className="flex rounded-full border border-orange-200 bg-orange-50 p-1" aria-label={t.language}>
              {supportedLocales.map((entry) => (
                <button
                  className={`min-h-9 rounded-full px-3 text-sm font-semibold transition ${
                    locale === entry ? "bg-white text-tomato-700 shadow-sm" : "text-stone-600 hover:text-tomato-700"
                  }`}
                  key={entry}
                  onClick={() => setLocale(entry)}
                  type="button"
                >
                  {localeLabels[entry]}
                </button>
              ))}
            </div>
            <a
              className="relative rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-stone-800 shadow-sm transition hover:border-tomato-300 hover:text-tomato-700"
              href="#cart"
            >
              {t.cart}
              <span className="ml-2 inline-flex min-w-6 justify-center rounded-full bg-tomato-500 px-2 py-0.5 text-xs text-white">
                {cartCount}
              </span>
            </a>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_26rem] lg:py-14">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-tomato-700">
            {t.navMenu}
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-normal text-stone-950 sm:text-5xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">{t.heroCopy}</p>
          {successMessage ? (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-800">
              {successMessage}
            </div>
          ) : null}
        </div>
        <Customizer
          locale={locale}
          pizza={selectedPizza}
          selectedSizeId={selectedSizeId}
          selectedToppingIds={selectedToppingIds}
          quantity={quantity}
          unitPrice={unitPrice}
          total={previewTotal}
          onAddToCart={addToCart}
          onQuantityChange={setQuantity}
          onSizeChange={setSelectedSizeId}
          onToppingToggle={toggleTopping}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6" id="menu">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black text-stone-950">{t.menuTitle}</h2>
          <div className="text-sm font-semibold text-stone-500">10</div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pizzaCatalog.map((pizza) => {
            const isSelected = pizza.id === selectedPizza.id;
            return (
              <button
                className={`group overflow-hidden rounded-lg border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft ${
                  isSelected ? "border-tomato-500 ring-2 ring-tomato-100" : "border-orange-100"
                }`}
                key={pizza.id}
                onClick={() => setSelectedPizzaId(pizza.id)}
                type="button"
              >
                <img className="aspect-square w-full object-cover" src={pizza.image} alt={pizza.name[locale]} />
                <div className="p-4">
                  <h3 className="line-clamp-2 min-h-12 text-base font-black text-stone-950">{pizza.name[locale]}</h3>
                  <p className="mt-2 line-clamp-3 min-h-16 text-sm leading-5 text-stone-600">{pizza.description[locale]}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase text-stone-500">{t.startingAt}</span>
                    <span className="font-black text-tomato-700">{formatPrice(locale, pizza.basePrice)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6" id="cart">
        <div className="rounded-lg border border-orange-100 bg-white p-4 shadow-soft sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-stone-950">{t.cartTitle}</h2>
            <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-tomato-700">
              {t.total}: {formatPrice(locale, cartTotal)}
            </div>
          </div>

          {cartLines.length === 0 ? (
            <div className="rounded-lg border border-dashed border-orange-200 bg-orange-50 p-8 text-center font-semibold text-stone-600">
              {t.emptyCart}
            </div>
          ) : (
            <div className="space-y-3">
              {cartLines.map((line) => (
                <div className="grid gap-3 rounded-lg border border-orange-100 p-3 sm:grid-cols-[1fr_auto] sm:items-center" key={line.id}>
                  <div>
                    <div className="font-black text-stone-950">{line.pizza?.name[locale]}</div>
                    <div className="mt-1 text-sm text-stone-600">
                      {line.size?.name[locale]}
                      {line.selectedToppings.length > 0
                        ? ` · ${line.selectedToppings.map((topping) => topping?.name[locale]).join(", ")}`
                        : ""}
                    </div>
                    <div className="mt-2 text-sm font-bold text-tomato-700">
                      {t.subtotal}: {formatPrice(locale, line.subtotal)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <QuantityStepper value={line.quantity} onChange={(next) => changeCartQuantity(line.id, next)} />
                    <button
                      className="rounded-full border border-stone-200 px-3 py-2 text-sm font-bold text-stone-600 transition hover:border-tomato-300 hover:text-tomato-700"
                      onClick={() => removeCartItem(line.id)}
                      type="button"
                    >
                      {t.remove}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <button
              className="rounded-full bg-tomato-600 px-6 py-3 font-black text-white shadow-sm transition hover:bg-tomato-700 disabled:cursor-not-allowed disabled:bg-stone-300"
              disabled={cartItems.length === 0}
              onClick={() => setIsCheckoutOpen(true)}
              type="button"
            >
              {t.checkout}
            </button>
          </div>
        </div>
      </section>

      {isCheckoutOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-lg bg-white p-5 shadow-soft sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-stone-950" id="checkout-title">
                  {t.checkoutTitle}
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">{t.simulatedPayment}</p>
              </div>
              <button
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-stone-200 font-bold text-stone-600 hover:border-tomato-300 hover:text-tomato-700"
                onClick={() => setIsCheckoutOpen(false)}
                type="button"
                aria-label="Close"
              >
                x
              </button>
            </div>
            <div className="space-y-3">
              {cartLines.map((line) => (
                <div className="flex justify-between gap-4 border-b border-orange-100 pb-3" key={line.id}>
                  <div>
                    <div className="font-bold text-stone-950">{line.pizza?.name[locale]}</div>
                    <div className="text-sm text-stone-600">
                      {line.quantity} x {line.size?.name[locale]}
                    </div>
                  </div>
                  <div className="font-black text-tomato-700">{formatPrice(locale, line.subtotal)}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-lg bg-orange-50 px-4 py-3">
              <span className="font-black text-stone-900">{t.total}</span>
              <span className="text-xl font-black text-tomato-700">{formatPrice(locale, cartTotal)}</span>
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button
                className="rounded-full border border-orange-200 px-5 py-3 font-bold text-stone-700 hover:border-tomato-300 hover:text-tomato-700"
                onClick={() => setIsCheckoutOpen(false)}
                type="button"
              >
                {t.continueShopping}
              </button>
              <button className="rounded-full bg-basil px-5 py-3 font-black text-white hover:bg-green-800" onClick={confirmOrder} type="button">
                {t.confirmOrder}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function Customizer({
  locale,
  pizza,
  selectedSizeId,
  selectedToppingIds,
  quantity,
  unitPrice,
  total,
  onAddToCart,
  onQuantityChange,
  onSizeChange,
  onToppingToggle
}: {
  locale: Locale;
  pizza: PizzaDto;
  selectedSizeId: SizeDto["id"];
  selectedToppingIds: string[];
  quantity: number;
  unitPrice: number;
  total: number;
  onAddToCart: () => void;
  onQuantityChange: (value: number) => void;
  onSizeChange: (value: SizeDto["id"]) => void;
  onToppingToggle: (id: string) => void;
}) {
  const t = shopRepository.getMessages(locale);

  return (
    <aside className="rounded-lg border border-orange-100 bg-white p-4 shadow-soft sm:p-5">
      <h2 className="text-xl font-black text-stone-950">{t.customizerTitle}</h2>
      <div className="mt-4 flex gap-3 rounded-lg bg-orange-50 p-3">
        <img className="h-24 w-24 rounded-lg object-cover" src={pizza.image} alt={pizza.name[locale]} />
        <div className="min-w-0">
          <div className="text-xs font-bold uppercase text-tomato-700">{t.selectedPizza}</div>
          <div className="mt-1 font-black text-stone-950">{pizza.name[locale]}</div>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-stone-600">{pizza.description[locale]}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 font-black text-stone-900">{t.chooseToppings}</div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {toppingCatalog.map((topping) => {
            const checked = selectedToppingIds.includes(topping.id);
            return (
              <button
                className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition ${
                  checked ? "border-tomato-500 bg-tomato-50 text-tomato-700" : "border-orange-100 bg-white text-stone-700 hover:border-tomato-200"
                }`}
                key={topping.id}
                onClick={() => onToppingToggle(topping.id)}
                type="button"
                aria-pressed={checked}
              >
                <span className="font-bold">{topping.name[locale]}</span>
                <span className="text-sm font-black">{formatPrice(locale, topping.price)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 font-black text-stone-900">{t.chooseSize}</div>
        <div className="grid grid-cols-3 gap-2">
          {sizeCatalog.map((size) => (
            <button
              className={`min-h-16 rounded-lg border px-2 py-2 text-center transition ${
                selectedSizeId === size.id ? "border-tomato-500 bg-tomato-50 text-tomato-700" : "border-orange-100 bg-white text-stone-700 hover:border-tomato-200"
              }`}
              key={size.id}
              onClick={() => onSizeChange(size.id)}
              type="button"
            >
              <span className="block font-black">{size.name[locale]}</span>
              <span className="mt-1 block text-xs font-bold">+{formatPrice(locale, size.adjustment)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="font-black text-stone-900">{t.quantity}</div>
        <QuantityStepper value={quantity} onChange={onQuantityChange} />
      </div>

      <div className="mt-5 rounded-lg bg-stone-950 p-4 text-white">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span>{t.unitPrice}</span>
          <span className="font-black">{formatPrice(locale, unitPrice)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4 text-lg font-black">
          <span>{t.total}</span>
          <span>{formatPrice(locale, total)}</span>
        </div>
      </div>

      <button className="mt-4 w-full rounded-full bg-tomato-600 px-5 py-3 font-black text-white shadow-sm transition hover:bg-tomato-700" onClick={onAddToCart} type="button">
        {t.addToCart}
      </button>
    </aside>
  );
}

function QuantityStepper({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="inline-flex h-11 items-center rounded-full border border-orange-200 bg-white">
      <button
        className="grid h-10 w-10 place-items-center rounded-full text-lg font-black text-stone-700 transition hover:bg-orange-50 disabled:text-stone-300"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        type="button"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="w-10 text-center font-black text-stone-950">{value}</span>
      <button
        className="grid h-10 w-10 place-items-center rounded-full text-lg font-black text-stone-700 transition hover:bg-orange-50"
        onClick={() => onChange(value + 1)}
        type="button"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
