export function formatPrice(price: number, locale: string = 'en') {
  if (locale === 'vi') {
    return new Intl.NumberFormat('vi-Vn', { style: 'currency', currency: 'VND' }).format(price);
  }

  return new Intl.NumberFormat('en-En', { style: 'currency', currency: 'USD' }).format(price);
}

export function formatStringWithMaxLength(content: string, maxLength: number) {
  if (content === undefined) return '';
  if (maxLength < 0 || content.length <= maxLength) return content;

  return content.substring(0, maxLength) + '...';
}

export function filterObject(object: { [key: string]: any } | null, ...fields: Array<any>) {
  if (!object) return {};
  let obj: any = {};
  fields.forEach((item: any) => {
    if (Object.keys(object).includes(item)) obj[item] = object[item];
  });

  return obj;
}
