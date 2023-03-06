// Array of fake data
// Math.floor(math.random) will generate a random value between 50 and 250 for each stock symbol
export const stockData = [
  { id: 1, symbol: "AAPL", value: Math.floor(Math.random() * 250) + 50 },
  { id: 2, symbol: "GOOG", value: Math.floor(Math.random() * 250) + 50 },
  { id: 3, symbol: "TSLA", value: Math.floor(Math.random() * 250) + 50 },
  { id: 4, symbol: "AMZN", value: Math.floor(Math.random() * 250) + 50 },
  { id: 5, symbol: "FB", value: Math.floor(Math.random() * 250) + 50 },
];
