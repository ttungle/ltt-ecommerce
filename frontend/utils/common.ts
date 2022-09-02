export function formatPrice(price: number, locale: string) {
  if (locale === 'vi') {
    return new Intl.NumberFormat('vi-Vn', { style: 'currency', currency: 'VND' }).format(price);
  }

  return new Intl.NumberFormat('en-En', { style: 'currency', currency: 'USD' }).format(price);
}
