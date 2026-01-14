// =====================
// Array methods
// =====================

let arr = [4, 4, 4, 4];

// every → all elements must pass
let array = arr.every((e, i) => {
  return e === 4;
});
console.log(array); // true

// some → at least one element must pass
let array2 = arr.some((e, i) => {
  return e === 49;
});
console.log(array2); // false

// reduce → sum of array
let sum = arr.reduce((preVal, curVal) => {
  return preVal + curVal;
}, 0);
console.log(sum); // 16

// findIndex → index of element
let findIndex = arr.findIndex((e, i) => {
  return e === 60;
});
console.log(findIndex); // -1

// find → value itself
let find = arr.find((e, i) => {
  return e === 60;
});
console.log(find); // undefined

// filter → all matching values
let filter = arr.filter((e, i) => {
  return e > 50;
});
console.log(filter); // []

// map → transform values
let looping = arr.map((e, i) => {
  return e + "abc";
});
console.log(looping); // ["4abc","4abc","4abc","4abc"]


// =====================
// Promises (basic)
// =====================

let pro = new Promise((resolve, reject) => {
  let status = true;

  if (status) {
    resolve(100);
  } else {
    reject(0);
  }
});

pro
  .then((data) => {
    console.log(data); // 100
  })
  .catch((err) => {
    console.log(err);
  });


// =====================
// Fetch with Promise
// =====================

let fetchData = new Promise((resolve, reject) => {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then((data) => data.json())
    .then((res) => resolve(res))
    .catch((err) => reject(err));
});

fetchData
  .then((data) => {
    console.log(data); // array of photos
  })
  .catch((err) => {
    console.log(err);
  });


// =====================
// Async / Await
// =====================

let callData = async () => {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    let realResponse = await response.json();
    console.log(realResponse);
  } catch (error) {
    console.log(error);
  }
};

callData();


// =====================
// Another array
// =====================

let arr2 = [1, 2, 3, 4, 5];
console.log(arr2);
