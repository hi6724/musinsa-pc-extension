function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatNumber(number) {
  const result = number > 9999 ? 9999 : number;
  return result.toLocaleString('en-US');
}
