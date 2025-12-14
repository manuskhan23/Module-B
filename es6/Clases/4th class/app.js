// let arr = [4, 4, 4, 4];

// let array = arr.every((e, i) => {
//   return e === 4;
// });

// console.log(array);

// let array2 = arr.some((e, i) => {
//   return e === 49;
// });

// console.log(array2);

// let sum = arr.reduce((preVal, curVal) => {
//   return
//   { num: preVal.num + curVal.num };
// });

// console.log(sum.num);

// let findIndex = arr.findIndex((e, i) => {
//   return e === 60;
// });

// console.log(findIndex);

// let find = arr.find((e, i) => {
//   return e === 60;
// });

// console.log(find);

// let filter = arr.filter((e, i) => {
//   return e > 50;
// });

// console.log(filter);

// let looping = arr.map((e, i) => {
//   return e + "abc";
// });

// console.log(looping);

// Synchronous and Asynchronous

// 1) callback function

// 2) promises

// promises works only in 3 states

// 1) pending
// 2) fulfilled
// 3) rejected

// let pro = new Promise((fulfilled, rejected) => {
//   let status = true;

//   if (status) {
//     fulfilled(100);
//   } else {
//     rejected(0);
//   }

// });

// pro
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// fetch method

// what is API?

// let fetchData = new Promise((fulfil, reject) => {
//   fetch("https://jsonplaceholder.typicode.com/photos")
//     .then((data) => data.json())
//     .then((res) => fulfil(res))
//     .catch((err) => {
//       reject(err);
//     });
// });

// fetchData
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// console.log(getData);

// 3) async await

let callData = async () => {
  try {
    let getData = await fetch("https://fakestoreapi.com/products");
    let realResponse = await getData.json();
    console.log(realResponse);
    
  } catch (error) {
    console.log(error);
  }
};

callData();

// let arr;

// arr = [1,2,3,4,5];

// console.log(arr);