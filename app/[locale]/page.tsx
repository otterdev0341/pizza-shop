import { notFound } from "next/navigation";
import { PizzaShop } from "../../components/pizza-shop";
import type { Locale } from "../../lib/dto/shop.dto";
import { shopRepository } from "../../lib/repositories/shop.repository";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return shopRepository.getLocales().map((locale) => ({ locale }));
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;
  if (!shopRepository.isLocale(locale)) {
    notFound();
  }

  return <PizzaShop initialLocale={locale as Locale} />;
}
