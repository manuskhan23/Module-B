// Arrow function

let arrowFunc = () => {
    alert("hello arrow function");
};

arrowFunc();


let sum = (a, b) => a + b


console.log(sum(5, 10));

message();

function message() {
  alert("welcome to our web page");
}

func();

let func = function () {
  alert("welcome to our web page");
};


// callback function


let abc = (callback) => {
  console.log("abc function call..");
  callback();
};

let xyz = () => {
  console.log("xyz function call..");
};

abc(xyz);

setInterval(()=>{

},1000)



// callback function are those function that argument receive as a
// function so that function is called callback function.

// and abc is a higher order function because xyz function depends
// upon abc function.


let abc2 = (callback) => {
  console.log("abc function call..");
  callback(100);
};

let xyz2 = (val) => {
  console.log("xyz function call..", val);
};

abc(xyz2);



function a() {
  console.log("a function call..");
  return function b() {
    console.log("b function call..");
    return function c() {
      console.log("c function call..");
    };
  };
}

a()()();



// spread operator

let city1 = ["karachi", "lahore"];
let city2 = ["peshawar", "multan"];

// // concat()

let merge = city1.concat(city2);

console.log(merge);

let merge2 = [...city1, ...city2];

console.log(merge2);

let obj1 = {
  id: 1,
  name: "faraz",
};

let obj2 = {
  desgination: "instructor",
  gender: "male",
};

let mixedOBJ = { ...obj1, ...obj2 };

console.log(mixedOBJ);

// pass by value and pass by reference


let num1 = 500;

let num2 = num1;

console.log(num1);

console.log(num2);

let name1 = "farhan";

let name2 = name1;

console.log(name1);

console.log(name2);



let status = true;

let status2 = status;

console.log(status);

console.log(status2);



let num3 = 100;

let num4 = num3;

num3 = 50;

console.log(num3);

console.log(num4);



let arr1 = [1, 2, 3];

let arr2 = [...arr1];

arr1.push(4, 5, 6, 7, 8, 9);

console.log(arr1);

console.log(arr2);



let obj3 = {
  id: 1,
  name: "faraz",
};

let obj4 = obj3;

obj3.gender = "male";

console.log(obj3);
console.log(obj4);


// shallow copy


let city3 = ["lahore", "multan"];

let city4 = [...city3];

city1.unshift("karachi");

console.log(city3);
console.log(city4);



let stdObj = {
  name: "abc",
  email: "abc@gmail.com",
};

let stdObj2 = { ...stdObj };

stdObj2.status = false;

console.log(stdObj);
console.log(stdObj2);



// deep copy


let obj = {
  name: "ali",
  email: "ali@gmail.com",
  institute: {
    name: "JWP",
    Module: "B",
    timezone: {
      longitude: "27.1.221.354",
      latitude: "56.1.872.00",
    },
  },
};

let objb = { ...obj, institute: { ...obj.institute } };

obj.institute.Module = "A";

console.log(obj);
console.log(objb);



//  Array Methods

let arr = [1, 2, 3, 4, 3, 5, 5, 7, 9, 9, 10];

let findData = arr.find((element, index) => {
  return element === 20;
});
console.log(findData);

// -------------------------------------------------

let filterData = arr.filter((element, index) => {
  return element > 2;
});
console.log(filterData);

// -------------------------------------------------

let arrMAP = arr.map((element, index) => {
  return element + 10;
});
console.log(arrMAP);

// -------------------------------------------------


let arrMAP2 = arr.map((element, index) => {
  console.log(element);

});
console.log(arrMAP2);