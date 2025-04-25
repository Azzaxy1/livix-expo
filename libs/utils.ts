export const convertToRupiah = (price: number) => {
  const numberString = String(price).replace(/[^,\d]/g, "");
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Number(numberString) / 1000);
  return rupiah;
};
