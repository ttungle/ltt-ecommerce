export type DeliveryMethodData = 'store' | 'delivery';
export type PaymentMethodData = 'visa' | 'mastercard' | 'cash';
export interface ShippingOptionRadioData {
  label: string;
  value: string;
}

export interface CheckoutTextContentData {
  cashPaymentDescription: string;
  checkoutHeader: string;
  contactHeader: string;
  deliveryHeader: string;
  orderButton: string;
  orderHeader: string;
  paymentHeader: string;
  receiveAtStoreContent: string;
  shippingRadio1: string;
  shippingRadio2: string;
}

export interface CheckoutContentData {
  data: {
    attributes: {
      checkoutContent: CheckoutTextContentData;
    };
  };
}