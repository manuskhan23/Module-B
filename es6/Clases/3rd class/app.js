// arrow function

// let arrowFunc=(a,b)=>{
//     alert(a+b)
// }

// arrowFunc(5,5)


// ---------- OR ----------

// let sum=(a,b)=>a+b

// console.log(sum(5,5))

// CALL BACK FUNCTION

// let abc=(cl)=>{
//     console.log("abc")
//     cl(100)
// }

// let xyz=(fl)=>{
//     console.log(`xyz ${fl}`)
// }

// abc(xyz)

// CONCAT()

// let d1=["d","d2"]
// let d2=["d3","d4"]
// let m=d1.concat(d2)
// console.log(m)

// SPREAD OPERATOR


// // object



// let obj1={
//     name:"wahid",
//     id:10423
// }

// let obj2={
//     residency:"karachi",
//     age:34
// }

// let objmix={...obj1,...obj2}

// console.log(objmix)
// // array



// let dm1=["d","d2"]
// let dm2=["d3","d4"]
// let mix=[...dm1,...dm2]
// console.log(mix)

let obj={
    name:"mulla",
    email:"mulla123@gmail.com",
    institute:{
        name:"JWP",
        Module:"B",
        timezone:{
            longitude:"234.423.112.345",
            lattitude:"445.324.565.466"
        }
    }
}
let copy={...obj , institute:{...obj.institute , timezone:{
    ...obj.institute.timezone
}}}
obj.institute.timezone.lattitude="3533.343.242"
console.log(copy)
console.log(obj)