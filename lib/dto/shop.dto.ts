export type Locale = "th" | "zh" | "en";

export type LocalizedTextDto = Record<Locale, string>;

export type PizzaDto = {
  id: string;
  name: LocalizedTextDto;
  description: LocalizedTextDto;
  basePrice: number;
  image: string;
};

export type ToppingDto = {
  id: string;
  name: LocalizedTextDto;
  price: number;
};

export type SizeDto = {
  id: "small" | "medium" | "large";
  name: LocalizedTextDto;
  adjustment: number;
};

export type CartItemDto = {
  id: string;
  pizzaId: string;
  toppingIds: string[];
  sizeId: SizeDto["id"];
  quantity: number;
};

export type CartLineDto = CartItemDto & {
  pizza?: PizzaDto;
  size?: SizeDto;
  selectedToppings: ToppingDto[];
  unitPrice: number;
  subtotal: number;
};
