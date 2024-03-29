export const GLOBAL_PATHs = {
  login: '/account/login',
  register: '/account/register',
  profile: '/account/profile',
  changePassword: '/account/password',
  favoriteProducts: '/account/favorite',
  home: '/',
  shop: '/shop/category/all-products',
  productDetail: '/shop/product/',
  cart: '/cart',
  checkout: '/checkout',
  checkoutSuccess: '/checkout/success',
  checkoutError: '/checkout/error',
  search: '/search',
  blog: '/blog',
  blogAll: '/blog/all',
  blogDetail: '/blog/detail',
};

export const LIGHT_FOOTER_PATHs = [GLOBAL_PATHs.home, GLOBAL_PATHs.cart];
export const DARK_BACKGROUND_PATHs = [GLOBAL_PATHs.cart];
export const BOTTOM_NAV_HEIGHT = '50px';
export const LOCAL_API_URL = 'http://localhost:1337';
