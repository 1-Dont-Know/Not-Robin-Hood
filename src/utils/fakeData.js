export const fakeData = [
  {
    id: 1,
    day: 1,
    price: 130,
  },
  {
    id: 2,
    day: 2,
    price: 170,
  },
  {
    id: 3,
    day: 3,
    price: 150,
  },
  {
    id: 4,
    day: 4,
    price: 300,
  },
  {
    id: 5,
    day: 5,
    price: 330,
  },
  {
    id: 6,
    day: 6,
    price: 360,
  },
  {
    id: 7,
    day: 7,
    price: 359,
  },
  {
    id: 8,
    day: 8,
    price: 371,
  },
];

// Array of fake data
// Math.floor(math.random) will generate a random value between 50 and 250 for each stock symbol
export const stockData = [
  { id: 1, symbol: "AAPL", value: Math.floor(Math.random() * 250) + 50 },
  { id: 2, symbol: "GOOG", value: Math.floor(Math.random() * 250) + 50 },
  { id: 3, symbol: "TSLA", value: Math.floor(Math.random() * 250) + 50 },
  { id: 4, symbol: "AMZN", value: Math.floor(Math.random() * 250) + 50 },
  { id: 5, symbol: "FB", value: Math.floor(Math.random() * 250) + 50 },
];
