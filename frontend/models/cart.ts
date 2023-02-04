export interface CartPageData {
  data: CartAttributeData;
}

interface CartAttributeData {
  attributes: CartPage;
}

interface CartPage {
  pageHeader: string;
  cartTable: CartTableData;
  cartTotal: CartTotalData;
}

export interface CartTableData {
  productTableHead: string;
  priceTableHead: string;
  quantityTableHead: string;
  subtotalTableHead: string;
  removeDialogTitle: string;
  removeDialogContent: string;
  removeDialogYesButton: string;
  removeDialogNoButton: string;
}

export interface CartTotalData {
  cartTotalTitle: string;
  cartSubtotal: string;
  cartPromotion: string;
  cartTotalPrice: string;
  cartCheckoutButton: string;
  cartPromotionButtonShow: string;
  cartPromotionButtonHide: string;
}
