export default function formatMoney(money = 0) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };
  const formatter = new Intl.NumberFormat("en-US", options);
  return formatter.format(money / 10);
}
