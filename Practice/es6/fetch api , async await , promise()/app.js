// --------------------------------
// Promises
// --------------------------------


// let prom1 = new Promise((resolve, reject) => {
//     let a = Math.random();
//     if (a < 0.5) {
//         reject("No random number was not supporting you")
//     }
//     else {
//         setTimeout(() => {
//             console.log("Yes I am done")
//             resolve("Harry")
//         }, 3000);
//     }
// })

// let prom2 = new Promise((resolve, reject) => {
//     let a = Math.random();
//     if (a < 0.5) {
//         reject("No random number was not supporting you 2")
//     }
//     else {
//         setTimeout(() => {
//             console.log("Yes I am done 2")
//             resolve("Harry 2")
//         }, 1000);
//     }
// })

// let prom3 = new Promise((resolve, reject) => {
//     let a = Math.random();
//     if (a < 0.5) {
//         reject("No random number was not supporting you 3")
//     }
//     else {
//         setTimeout(() => {
//             console.log("Yes I am done 3")
//             resolve("Harry 3")
//         }, 2000);
//     }
// })

// let prom4 = new Promise((resolve, reject) => {
//     let a = Math.random();
//     if (a < 0.5) {
//         reject("No random number was not supporting you 4")
//     }
//     else {
//         setTimeout(() => {
//             console.log("Yes I am done 4")
//             resolve("Harry 4")
//         }, 4000);
//     }
// })

// let prom5 = new Promise((resolve, reject) => {
//     let a = Math.random();
//     if (a < 0.5) {
//         reject("No random number was not supporting you 5")
//     }
//     else {
//         setTimeout(() => {
//             console.log("Yes I am done 5")
//             resolve("Harry 5")
//         }, 3000);
//     }
// })

// let p_race = Promise.race([prom1, prom2])
// p_race.then((a)=>{
//     console.log(a)
// }).catch(err=>{
//     console.log(err)
// })

// let p_all = Promise.all([prom1, prom2])
// p_all.then((a)=>{
//     console.log(a)
// }).catch(err=>{
//     console.log(err)
// })

// let p_allsetteled = Promise.allSettled([prom1, prom2])
// p_allsetteled.then((a)=>{
//     console.log(a)
// }).catch(err=>{
//     console.log(err)
// })

// let p_any = Promise.any([prom1, prom2])
// p_any.then((a)=>{
//     console.log(a)
// }).catch(err=>{
//     console.log(err)
// })

// let p_resolve = Promise.resolve([prom1, prom2 , prom3, prom4, prom5])
// p_resolve.then((a)=>{
//     console.log(a)
// }).catch(err=>{
//     console.log(err)
// })

// let p_reject = Promise.reject([prom1, prom2 , prom3, prom4, prom5])
// p_reject.then((a)=>{
//     console.log(a)
// }).catch(err=>{
//     console.log(err)
// })

// --------------------------------
// async await
// --------------------------------

// let getData = async ()=>{
//     // simulate getting data from server
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             resolve("Data received")
//         }, 1000);
//     })
// }

// let mainAsync = async ()=>{
//     console.log(`Loading Module...`)
// console.log(`do something else`);
// console.log(`loading Data...`);

// let data=await getData()

// console.log(data)

// console.log(`process data`);

// console.log(`task 2`);

// }

// mainAsync()

// data.then((v)=>{
//     console.log(data)
// })



// console.log(data)

// --------------------------------
// Fetch API
// --------------------------------

async function getData() {
    // Simulate getting data from a server
    // let x = await fetch('https://jsonplaceholder.typicode.com/todos/1')

    let x = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
    let data = await x.json() 
    return data
}

async function main(){
    console.log("Loading modules")

    console.log("Do something else")

    console.log("Load data")

    let data = await getData()

    console.log(data)

    console.log("process data")

    console.log("task 2")

}

main()

 

// data.then((v) => { 
//     console.log(data)

//     console.log("process data")

//     console.log("task 2")
 
// })