import type { CartItemDto, Locale, SizeDto } from "../dto/shop.dto";
import { shopRepository } from "../repositories/shop.repository";

export function formatPrice(locale: Locale, value: number) {
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : locale === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0
  }).format(value);
}

export function calculateUnitPrice(pizzaId: string, sizeId: SizeDto["id"], toppingIds: string[]) {
  const pizza = shopRepository.getPizzaById(pizzaId);
  const size = shopRepository.getSizeById(sizeId);
  if (!pizza || !size) return 0;

  const toppingTotal = toppingIds.reduce((total, id) => {
    const topping = shopRepository.getToppingById(id);
    return total + (topping?.price ?? 0);
  }, 0);

  return pizza.basePrice + size.adjustment + toppingTotal;
}

export function calculateLineSubtotal(item: CartItemDto) {
  return calculateUnitPrice(item.pizzaId, item.sizeId, item.toppingIds) * item.quantity;
}

export function calculateCartTotal(items: CartItemDto[]) {
  return items.reduce((total, item) => total + calculateLineSubtotal(item), 0);
}
