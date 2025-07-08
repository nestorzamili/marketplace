export interface ShippingOption {
  value: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export const shippingOptions: ShippingOption[] = [
  {
    value: 'regular',
    name: 'Reguler',
    description: 'JNE/J&T/SiCepat',
    price: 25000,
    estimatedDays: '2-3 hari',
  },
  {
    value: 'express',
    name: 'Express',
    description: 'Same Day/Next Day',
    price: 35000,
    estimatedDays: '1-2 hari',
  },
  {
    value: 'instant',
    name: 'Instant',
    description: 'GoSend/GrabExpress',
    price: 50000,
    estimatedDays: '2-4 jam',
  },
];

export const calculateShippingCost = (
  shippingMethod: string,
  subtotal: number,
): number => {
  if (!shippingMethod) return 0;

  const selectedOption = shippingOptions.find(
    (option) => option.value === shippingMethod,
  );
  if (!selectedOption) return 0;

  // Free shipping for regular method if subtotal >= 500000
  if (subtotal >= 500000 && shippingMethod === 'regular') {
    return 0;
  }

  return selectedOption.price;
};

export const getShippingOption = (
  value: string,
): ShippingOption | undefined => {
  return shippingOptions.find((option) => option.value === value);
};
