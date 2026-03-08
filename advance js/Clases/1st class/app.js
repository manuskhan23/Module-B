// advance js, es6
    
// var
 
// let const

var names = "faraz";

{
  var names = "ahmed";
}

console.log(names);



function greet() {
  const abc = "hello user";
}

console.log(abc);



let number = 100;
number = 50;

console.log(number);


const user = {
  name: "faraz",
  email: "faraz@gmail.com",
  age: 25,
};
user = 20;

console.log(user);



let num1= 10;

let num = 20;

console.log(num);


// hoisted


console.log(IsStatus);

var IsStatus = false;


// template literals

let name = "faraz";

let age = 25;

// console.log("Hello My name is ", name, "and I am", age, "years old");

console.log(`Hello My name is ${name} and I am ${age} years old`);


// ternary operator

let city = "lahore";

city === "karachi" ? console.log("allow") : console.log("not allow");


let percentage = 105;

let check =
  percentage >= 80 && percentage <= 100
    ? "A+"
    : percentage >= 70 && percentage <= 80
    ? "A Grade"
    : percentage >= 60 && percentage <= 70
    ? "B Grade"
    : percentage >= 50 && percentage <= 60
    ? "C Grade"
    : percentage >= 40 && percentage <= 50
    ? "D Grade"
    : "invalid input";

console.log(check);


// if (city === "lahore") {
//   console.log("allow");


let obj = {
  id: 1,
  name: "abc",
  city: "karachi",
  email: "abc@gmail.com",
};

console.log(Object.keys(obj));

console.log(Object.values(obj));

console.log(Object.freeze(obj));

obj.id = 100;

console.log(obj);

console.log(Object.entries(obj));


const mobiles = {
    iphone: {
        iphone7: {
            processor: "Snapdragon 8 Gen 2",
            memory: { ram: 12, storage: 512 },
            camera: { rear: { main: 200, ultrawide: 12, telephoto: 10, telephotoPeriscope: 10 }, front: 10 },
            brand: "iphone",
            battery: 5000,
            operatingSystem: "Android 13",
            specialFeatures: ["S Pen support", "Ultrasonic fingerprint sensor"]
        },
        iphone8: {
            processor: "Snapdragon 12 Gen 5",
            memory: { ram: 8, storage: 256 },
            brand: "iphone",
            camera: { rear: { main: 180, ultrawide: 15, telephoto: 10, telephotoPeriscope: 20 }, front: 12 },
            battery: 8000,
            operatingSystem: "iphone 8",
            specialFeatures: ["S Pen support", "Ultrasonic fingerprint sensor"]
        },
        iphone8plus: {
            processor: "Snapdragon 5 Gen 6",
            memory: { ram: 8, storage: 128 },
            brand: "iphone",
            camera: { rear: { main: 160, ultrawide: 18, telephoto: 10, telephotoPeriscope: 8 }, front: 16 },
            battery: 5000,
            operatingSystem: "iphone 8",
            specialFeatures: ["S Pen support", "Ultrasonic fingerprint sensor"]
        },
        iphoneX: {
            processor: "Snapdragon 5 Gen 4",
            memory: { ram: 8, storage: 256 },
            brand: "iphone",
            camera: { rear: { main: 130, ultrawide: 16, telephoto: 10, telephotoPeriscope: 18 }, front: 14 },
            battery: 6000,
            operatingSystem: "iphone X",
            specialFeatures: ["S Pen support", "Ultrasonic fingerprint sensor"]
        },
        iphone11: {
            processor: "Snapdragon 7 Gen 9",
            memory: { ram: 16, storage: 512 },
            camera: { rear: { main: 150, ultrawide: 24, telephoto: 16, telephotoPeriscope: 10 }, front: 20 },
            brand: "iphone",
            battery: 10000,
            operatingSystem: "iphone 11",
            specialFeatures: ["S Pen support", "Ultrasonic fingerprint sensor"]
        }
    },
    xiomi: {
        redmiA2: {
            modelName: "Mi 12 Pro",
            display: { size: 6.73, resolution: "3200 x 1440", panelType: "AMOLED", refreshRate: 120 },
            brand: "xiomi",
            processor: "Snapdragon 8 Gen 1",
            memory: { ram: 8, storage: 256 },
            camera: { rear: { main: "50MP", ultrawide: "50MP", telephoto: "48MP" }, front: "32MP" },
            battery: 4600,
            operatingSystem: "Android 12",
            specialFeatures: ["Wireless charging", "In-display fingerprint sensor"]
        },
        redmi10: {
            modelName: "Mi 8 Pro",
            display: { size: 5.73, resolution: "3000 x 1320", panelType: "AMOLED", refreshRate: 100 },
            brand: "xiomi",
            processor: "Snapdragon 7 Gen 5",
            memory: { ram: 12, storage: 256 },
            camera: { rear: { main: "50MP", ultrawide: "50MP", telephoto: "48MP" }, front: "32MP" },
            battery: 5000,
            operatingSystem: "Android 11",
            specialFeatures: ["Wireless charging", "In-display fingerprint sensor"]
        },
        redmi11: {
            modelName: "Mi 14 Pro",
            display: { size: 6.0, resolution: "3000 x 1240", panelType: "AMOLED", refreshRate: 150 },
            brand: "xiomi",
            processor: "Snapdragon 8 Gen 4",
            memory: { ram: 12, storage: 512 },
            camera: { rear: { main: "50MP", ultrawide: "50MP", telephoto: "48MP" }, front: "32MP" },
            battery: 8000,
            operatingSystem: "Android 12",
            specialFeatures: ["Wireless charging", "In-display fingerprint sensor"]
        },
        redmi12: {
            modelName: "Mi 12 Pro",
            display: { size: 7.4, resolution: "3200 x 1440", panelType: "AMOLED", refreshRate: 180 },
            brand: "xiomi",
            processor: "Snapdragon 12 Gen 1",
            memory: { ram: 12, storage: 512 },
            camera: { rear: { main: "50MP", ultrawide: "50MP", telephoto: "48MP" }, front: "32MP" },
            battery: 8000,
            operatingSystem: "Android 13",
            specialFeatures: ["Wireless charging", "In-display fingerprint sensor"]
        },
        redmi13: {
            modelName: "Mi 14 Pro",
            display: { size: 8.03, resolution: "4200 x 1540", panelType: "AMOLED", refreshRate: 100 },
            brand: "xiomi",
            processor: "Snapdragon 8 Gen 6",
            memory: { ram: 12, storage: 256 },
            camera: { rear: { main: "50MP", ultrawide: "50MP", telephoto: "48MP" }, front: "32MP" },
            battery: 10000,
            operatingSystem: "Android 13",
            specialFeatures: ["Wireless charging", "In-display fingerprint sensor"]
        },
        redmi13C: {
            modelName: "Mi 14 Pro",
            display: { size: 8.43, resolution: "4200 x 1340", panelType: "AMOLED", refreshRate: 100 },
            processor: "Snapdragon 9 Gen 5",
            memory: { ram: 12, storage: 512 },
            brand: "xiomi",
            camera: { rear: { main: "50MP", ultrawide: "50MP", telephoto: "48MP" }, front: "32MP" },
            battery: 10000,
            operatingSystem: "Android 13",
            specialFeatures: ["Wireless charging", "In-display fingerprint sensor"]
        }
    },
    realme: {
        realmiNote50: {
            brand: "Realme",
            model: "hypothetical model",
            display: { size: "6.5 inches", resolution: "FHD+ (1080 x 2400 pixels)", type: "AMOLED" },
            processor: "Qualcomm Snapdragon 8 Gen 1",
            memory: { ram: "8GB", storage: "128GB" },
            camera: { rear: { resolution: "64MP (wide) + 8MP (ultrawide) + 2MP (macro)" }, front: { resolution: "16MP" } },
            battery: { capacity: "5000mAh", fastCharging: "65W" },
            operatingSystem: "Android 12",
            specialFeatures: ["In-display fingerprint sensor", "3.5mm headphone jack"]
        },
        realmiC67: {
            brand: "Realme",
            model: "hypothetical model",
            display: { size: "6.7 inches", resolution: "FHD+ (1280 x 2100 pixels)", type: "AMOLED" },
            processor: "Qualcomm Snapdragon 6 Gen 4",
            memory: { ram: "8GB", storage: "256GB" },
            camera: { rear: { resolution: "64MP (wide) + 8MP (ultrawide) + 2MP (macro)" }, front: { resolution: "14MP" } },
            battery: { capacity: "5000mAh", fastCharging: "65W" },
            operatingSystem: "Android 11",
            specialFeatures: ["In-display fingerprint sensor", "3.5mm headphone jack"]
        },
        realmiC53: {
            brand: "Realme",
            model: "hypothetical model",
            display: { size: "7.1 inches", resolution: "FHD+ (1180 x 2500 pixels)", type: "AMOLED" },
            processor: "Qualcomm Snapdragon 8 Gen 6",
            memory: { ram: "12GB", storage: "128GB" },
            camera: { rear: { resolution: "64MP (wide) + 8MP (ultrawide) + 2MP (macro)" }, front: { resolution: "18MP" } },
            battery: { capacity: "8000mAh", fastCharging: "65W" },
            operatingSystem: "Android 12",
            specialFeatures: ["In-display fingerprint sensor", "3.5mm headphone jack"]
        },
        realmi9: {
            brand: "Realme",
            model: "hypothetical model",
            display: { size: "7.2 inches", resolution: "FHD+ (1180 x 2200 pixels)", type: "AMOLED" },
            processor: "Qualcomm Snapdragon 9 Gen 6",
            memory: { ram: "12GB", storage: "256GB" },
            camera: { rear: { resolution: "64MP (wide) + 8MP (ultrawide) + 2MP (macro)" }, front: { resolution: "24MP" } },
            battery: { capacity: "10000mAh", fastCharging: "75W" },
            operatingSystem: "Android 12",
            specialFeatures: ["In-display fingerprint sensor", "3.5mm headphone jack"]
        },
        realmi9i: {
            brand: "Realme",
            model: "hypothetical model",
            display: { size: "6.9 inches", resolution: "FHD+ (1480 x 2400 pixels)", type: "AMOLED" },
            processor: "Qualcomm Snapdragon 8 Gen 1",
            memory: { ram: "12GB", storage: "512GB" },
            camera: { rear: { resolution: "64MP (wide) + 8MP (ultrawide) + 2MP (macro)" }, front: { resolution: "16MP" } },
            battery: { capacity: "2000mAh", fastCharging: "70W" },
            operatingSystem: "Android 13",
            specialFeatures: ["In-display fingerprint sensor", "3.5mm headphone jack"]
        }
    },
    samsung: {
        samsung_Galaxy_S24: {
            brand: "Samsung",
            model: "Galaxy S24 Ultra",
            displaySize: 6.8,
            displayResolution: "3088x1440",
            displayType: "AMOLED",
            processor: "Snapdragon 8 Gen 2",
            memory: { ram: 12, storage: 512 },
            rearCamera: { megapixel: 108, features: ["10x Optical Zoom", "Night Mode", "8K Video Recording"] },
            frontCamera: { megapixel: 40 },
            batteryCapacity: 5000,
            fastCharging: "45W Super Fast Charging",
            operatingSystem: "Android 14",
            fingerprintSensor: true,
            waterResistance: "IP68",
            expandableStorage: false
        },
        samsung_Galaxy_S51: {
            brand: "Samsung",
            model: "Galaxy S51 Pro",
            displaySize: 7.2,
            displayResolution: "3088x1440",
            displayType: "AMOLED",
            processor: "Snapdragon 9 Gen 4",
            memory: { ram: 8, storage: 128 },
            rearCamera: { megapixel: 112, features: ["10x Optical Zoom", "Night Mode", "8K Video Recording"] },
            frontCamera: { megapixel: 40 },
            batteryCapacity: 8000,
            fastCharging: "45W Super Fast Charging",
            operatingSystem: "Android 11",
            fingerprintSensor: true,
            waterResistance: "IP68",
            expandableStorage: false
        },
        samsung_Galaxy_Prime: {
            brand: "Samsung",
            model: "Galaxy Prime Ultra",
            displaySize: 7.4,
            displayResolution: "3088x1440",
            displayType: "AMOLED",
            processor: "Snapdragon 8 Gen 10",
            memory: { ram: 4, storage: 64 },
            rearCamera: { megapixel: 108, features: ["10x Optical Zoom", "Night Mode", "8K Video Recording"] },
            frontCamera: { megapixel: 40 },
            batteryCapacity: 5000,
            fastCharging: "45W Super Fast Charging",
            operatingSystem: "Android 13",
            fingerprintSensor: true,
            waterResistance: "IP68",
            expandableStorage: false
        },
        samsung_Galaxy_S46: {
            brand: "Samsung",
            model: "Galaxy S46 Ultra",
            displaySize: 5.11,
            displayResolution: "3088x1440",
            displayType: "AMOLED",
            processor: "Snapdragon 8 Gen 2",
            memory: { ram: 6, storage: 64 },
            rearCamera: { megapixel: 108, features: ["10x Optical Zoom", "Night Mode", "8K Video Recording"] },
            frontCamera: { megapixel: 40 },
            batteryCapacity: 20000,
            fastCharging: "65W Super Fast Charging",
            operatingSystem: "Android 14",
            fingerprintSensor: true,
            waterResistance: "IP68",
            expandableStorage: false
        },
        samsung_Galaxy_S77: {
            brand: "Samsung",
            model: "Galaxy S77 Ultra",
            displaySize: 8.5,
            displayResolution: "3088x1440",
            displayType: "AMOLED",
            processor: "Snapdragon 12 Gen 24",
            memory: { ram: 12, storage: 512 },
            rearCamera: { megapixel: 158, features: ["10x Optical Zoom", "Night Mode", "8K Video Recording"] },
            frontCamera: { megapixel: 40 },
            batteryCapacity: 20000,
            fastCharging: "85W Super Fast Charging",
            operatingSystem: "Android 14",
            fingerprintSensor: true,
            waterResistance: "IP68",
            expandableStorage: true
        }
    }

}; 