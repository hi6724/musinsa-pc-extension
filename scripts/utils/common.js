function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatNumber(number) {
  if (number < 1000) return number.toString();
  if (number < 10000) return (number / 1000).toFixed(1) + '천+';
  return (number / 10000).toFixed(1) + '만+';
}
