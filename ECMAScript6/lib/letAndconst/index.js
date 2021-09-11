"use strict";

// let a = []
// for (let i = 0; i < 10; i++) {
//     a[i] = () => {
//         console.log(i)
//     }
// }
// a[6]() // let: 6; var: 10


// console.log("testVar", testVar) // undefined
// var testVar = 2

// console.log("testLet", testLet) // 报错 ReferenceError
// let testLet = 2

// var siqu = 123
// if (true) {
//     // TDZ 开始
//     siqu = 234 // ReferenceError: Cannot access 'siqu' before initialization
//     let siqu  // TDZ 结束
// }

// if (true) {
//     let b = 0
//     var b = 10 // SyntaxError: Identifier 'b' has already been declared
// }

// var temp1 = new Date()
// function f1 () {
//     console.log(temp1)
//     if (false) {
//         var temp1 = 'hahahahahahaha'
//     }
// }
// f1() // undefined

// var s1 = 'hello'
// for (var i1 = 0; i1 < s1.length; i1++) {
//     console.log(s1[i1])
// }
// console.log(i1) // 5


// function fun() { 
//     console.log('outside')
// }

// (function () {
//     if (false) {
//         // 重复声明一个函数
//         function fun() {
//             console.log('inside')
//         }
//     }

//     fun()
// })()

// let x = do {
//     let t = 2
//     t * t + 1
// }

// const a // Uncaught SyntaxError: Missing initializer in const declaration

// const foo = {}
// foo.a = 1 // 可以成功
// foo = {} // 指向另一个对象，报错

var a = 1;

if (true) {
    var _a = 2;
    {
        var _a2 = 3;
    }
}