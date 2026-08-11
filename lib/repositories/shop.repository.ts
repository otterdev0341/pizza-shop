import type { Locale, PizzaDto, SizeDto, ToppingDto } from "../dto/shop.dto";

export const locales: Locale[] = ["th", "zh", "en"];

const pizzas: PizzaDto[] = [
  {
    id: "margherita",
    name: { th: "มาร์เกอริตา", zh: "玛格丽特披萨", en: "Margherita" },
    description: {
      th: "ซอสมะเขือเทศสด มอสซาเรลลา และใบโหระพาหอม",
      zh: "番茄酱、马苏里拉芝士和清香罗勒叶",
      en: "Fresh tomato sauce, mozzarella, and fragrant basil leaves"
    },
    basePrice: 199,
    image: "/pizzas/margherita.webp"
  },
  {
    id: "pepperoni",
    name: { th: "เปปเปอโรนี", zh: "意式辣香肠披萨", en: "Pepperoni" },
    description: {
      th: "เปปเปอโรนีอบกรอบบนชีสเยิ้มและซอสเข้มข้น",
      zh: "香辣意式香肠配浓郁芝士和番茄酱",
      en: "Crisped pepperoni over melted cheese and rich tomato sauce"
    },
    basePrice: 239,
    image: "/pizzas/pepperoni.webp"
  },
  {
    id: "hawaiian",
    name: { th: "ฮาวายเอี้ยน", zh: "夏威夷披萨", en: "Hawaiian" },
    description: {
      th: "แฮมชิ้นโต สับปะรดหวานฉ่ำ และชีสละลาย",
      zh: "火腿、香甜菠萝和融化芝士的经典搭配",
      en: "Ham, juicy pineapple, and melted cheese in a classic pairing"
    },
    basePrice: 229,
    image: "/pizzas/hawaiian.webp"
  },
  {
    id: "bbq-chicken",
    name: { th: "บาร์บีคิวชิกเกน", zh: "烧烤鸡肉披萨", en: "BBQ Chicken" },
    description: {
      th: "ไก่นุ่ม ซอสบาร์บีคิวรมควัน และหอมแดง",
      zh: "嫩鸡肉、烟熏烧烤酱和红洋葱",
      en: "Tender chicken with smoky barbecue sauce and red onion"
    },
    basePrice: 259,
    image: "/pizzas/bbq-chicken.webp"
  },
  {
    id: "seafood-deluxe",
    name: { th: "ซีฟู้ดดีลักซ์", zh: "豪华海鲜披萨", en: "Seafood Deluxe" },
    description: {
      th: "กุ้ง หมึก และหอยบนซอสครีมรสกลมกล่อม",
      zh: "虾、鱿鱼和贝类配顺滑奶油酱",
      en: "Shrimp, squid, and mussels over a mellow cream sauce"
    },
    basePrice: 299,
    image: "/pizzas/seafood-deluxe.webp"
  },
  {
    id: "veggie-garden",
    name: { th: "เวจจี้การ์เดน", zh: "田园蔬菜披萨", en: "Veggie Garden" },
    description: {
      th: "ผักหลากสี เห็ด มะเขือเทศ และพริกหวานสด",
      zh: "彩色蔬菜、蘑菇、番茄和甜椒",
      en: "Colorful vegetables, mushrooms, tomatoes, and crisp peppers"
    },
    basePrice: 219,
    image: "/pizzas/veggie-garden.webp"
  },
  {
    id: "four-cheese",
    name: { th: "โฟร์ชีส", zh: "四重芝士披萨", en: "Four Cheese" },
    description: {
      th: "ชีสสี่ชนิดละลายหอมบนแป้งอบกรอบ",
      zh: "四种芝士融化在香脆饼底上",
      en: "Four cheeses melted over a crisp golden crust"
    },
    basePrice: 249,
    image: "/pizzas/four-cheese.webp"
  },
  {
    id: "meat-lovers",
    name: { th: "มีทเลิฟเวอร์ส", zh: "肉食爱好者披萨", en: "Meat Lovers" },
    description: {
      th: "เปปเปอโรนี เบคอน ไส้กรอก และเนื้อรวมแน่น",
      zh: "意式香肠、培根、香肠和丰富肉料",
      en: "Pepperoni, bacon, sausage, and a hearty mix of meats"
    },
    basePrice: 289,
    image: "/pizzas/meat-lovers.webp"
  },
  {
    id: "truffle-mushroom",
    name: { th: "ทรัฟเฟิลมัชรูม", zh: "松露蘑菇披萨", en: "Truffle Mushroom" },
    description: {
      th: "เห็ดหอม ซอสทรัฟเฟิล และชีสครีมมี่",
      zh: "香菇、松露酱和浓郁芝士",
      en: "Earthy mushrooms, truffle sauce, and creamy cheese"
    },
    basePrice: 319,
    image: "/pizzas/truffle-mushroom.webp"
  },
  {
    id: "spicy-thai-basil",
    name: { th: "สไปซี่กะเพรา", zh: "泰式辣罗勒披萨", en: "Spicy Thai Basil" },
    description: {
      th: "ไก่ผัดกะเพรา พริกสด และซอสเผ็ดแบบไทย",
      zh: "泰式罗勒鸡、鲜辣椒和香辣酱",
      en: "Thai basil chicken, fresh chilies, and a spicy Thai sauce"
    },
    basePrice: 269,
    image: "/pizzas/spicy-thai-basil.webp"
  }
];

const toppings: ToppingDto[] = [
  { id: "extra-cheese", name: { th: "เพิ่มชีส", zh: "加芝士", en: "Extra cheese" }, price: 35 },
  { id: "pepperoni", name: { th: "เปปเปอโรนี", zh: "意式辣香肠", en: "Pepperoni" }, price: 45 },
  { id: "mushroom", name: { th: "เห็ด", zh: "蘑菇", en: "Mushroom" }, price: 30 },
  { id: "bacon", name: { th: "เบคอน", zh: "培根", en: "Bacon" }, price: 45 },
  { id: "pineapple", name: { th: "สับปะรด", zh: "菠萝", en: "Pineapple" }, price: 25 }
];

const sizes: SizeDto[] = [
  { id: "small", name: { th: "เล็ก", zh: "小号", en: "Small" }, adjustment: 0 },
  { id: "medium", name: { th: "กลาง", zh: "中号", en: "Medium" }, adjustment: 60 },
  { id: "large", name: { th: "ใหญ่", zh: "大号", en: "Large" }, adjustment: 110 }
];

const messages = {
  th: {
    brand: "Pizza Studio",
    navMenu: "เมนู",
    cart: "ตะกร้า",
    heroTitle: "สั่งพิซซ่าร้อน ๆ ในไม่กี่คลิก",
    heroCopy: "เลือกหน้า เพิ่มท็อปปิง เลือกขนาด แล้วดูยอดรวมก่อนยืนยันออเดอร์แบบ demo",
    menuTitle: "เลือกหน้าพิซซ่า",
    customizerTitle: "ปรับแต่งพิซซ่า",
    chooseToppings: "เลือกท็อปปิง",
    chooseSize: "เลือกขนาด",
    quantity: "จำนวน",
    selectedPizza: "พิซซ่าที่เลือก",
    startingAt: "เริ่มต้น",
    unitPrice: "ราคาต่อชิ้น",
    addToCart: "ใส่ตะกร้า",
    selectPizzaFirst: "เลือกพิซซ่าก่อน",
    emptyCart: "ยังไม่มีสินค้าในตะกร้า",
    cartTitle: "ตะกร้าของคุณ",
    remove: "ลบ",
    subtotal: "รวมย่อย",
    total: "ยอดรวม",
    checkout: "ชำระเงิน",
    checkoutTitle: "สรุปคำสั่งซื้อ",
    simulatedPayment: "นี่เป็นการชำระเงินจำลอง ไม่มีการเก็บข้อมูลบัตรหรือเรียกเก็บเงินจริง",
    confirmOrder: "ยืนยันออเดอร์",
    continueShopping: "เลือกต่อ",
    success: "ยืนยันออเดอร์เรียบร้อย ตะกร้าถูกล้างแล้ว",
    language: "ภาษา"
  },
  zh: {
    brand: "Pizza Studio",
    navMenu: "菜单",
    cart: "购物车",
    heroTitle: "几步完成热腾腾的披萨订单",
    heroCopy: "选择披萨、添加配料、选择尺寸，并在模拟结账前查看总价",
    menuTitle: "选择披萨",
    customizerTitle: "定制披萨",
    chooseToppings: "选择配料",
    chooseSize: "选择尺寸",
    quantity: "数量",
    selectedPizza: "已选披萨",
    startingAt: "起价",
    unitPrice: "单价",
    addToCart: "加入购物车",
    selectPizzaFirst: "请先选择披萨",
    emptyCart: "购物车还是空的",
    cartTitle: "你的购物车",
    remove: "移除",
    subtotal: "小计",
    total: "总计",
    checkout: "结账",
    checkoutTitle: "订单摘要",
    simulatedPayment: "这是模拟支付，不会收集银行卡资料或真实扣款",
    confirmOrder: "确认订单",
    continueShopping: "继续选择",
    success: "订单已确认，购物车已清空",
    language: "语言"
  },
  en: {
    brand: "Pizza Studio",
    navMenu: "Menu",
    cart: "Cart",
    heroTitle: "Build a hot pizza order in a few clicks",
    heroCopy: "Choose a pizza, add toppings, pick a size, and review the total before a simulated checkout.",
    menuTitle: "Choose your pizza",
    customizerTitle: "Customize pizza",
    chooseToppings: "Choose toppings",
    chooseSize: "Choose size",
    quantity: "Quantity",
    selectedPizza: "Selected pizza",
    startingAt: "Starting at",
    unitPrice: "Unit price",
    addToCart: "Add to cart",
    selectPizzaFirst: "Select a pizza first",
    emptyCart: "Your cart is empty",
    cartTitle: "Your cart",
    remove: "Remove",
    subtotal: "Subtotal",
    total: "Total",
    checkout: "Checkout",
    checkoutTitle: "Order summary",
    simulatedPayment: "This is a simulated payment. No card details are collected and no real charge is made.",
    confirmOrder: "Confirm order",
    continueShopping: "Keep choosing",
    success: "Order confirmed. Your cart has been cleared.",
    language: "Language"
  }
} satisfies Record<Locale, Record<string, string>>;

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const shopRepository = {
  getLocales: () => locales,
  isLocale,
  getMessages: (locale: Locale) => messages[locale],
  getPizzas: () => pizzas,
  getPizzaById: (id: string) => pizzas.find((item) => item.id === id),
  getToppings: () => toppings,
  getToppingById: (id: string) => toppings.find((item) => item.id === id),
  getSizes: () => sizes,
  getSizeById: (id: SizeDto["id"]) => sizes.find((item) => item.id === id)
};
