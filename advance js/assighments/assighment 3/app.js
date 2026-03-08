const mainStoreInventory = [
{ name: "Laptop", price: 1200, stock: 5 },
{ name: "Mouse", price: 25, stock: 0 },
{ name: "Keyboard", price: 100, stock: 12 }
];
const acquiredStoreInventory = [
{ name: "Monitor", price: 300, stock: 8 },
{ name: "Headphones", price: 50, stock: 0 },
{ name: "Webcam", price: 75, stock: 20 }
];

const unifiedInventory = [...mainStoreInventory, ...acquiredStoreInventory];

const inStockItems = unifiedInventory.filter(
    item => item.stock > 0
);

const discountedInventory = inStockItems.map(item => {
  return {
    ...item,
    price: item.price * 0.9
  };
});

const totalValue = discountedInventory.reduce((sum, item) => {
  return sum + (item.price * item.stock);
}, 0);

console.log("Total Inventory Value:", totalValue);

// sir is ka answer 9900 araha hai mai ne chat gpt se bhi check karaya magr wo kah raha hai ka code is correct