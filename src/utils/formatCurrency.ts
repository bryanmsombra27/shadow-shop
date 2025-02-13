export const formatCurrency = (price: number = 0) => {
  return Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(price);
};
