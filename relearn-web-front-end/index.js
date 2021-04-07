// undefined = 'hi'
// const a = undefined

// console.log(undefined)
// console.log(a)

// const object1 = {
//     property1: 42
// };

// const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1')

// console.log(descriptor1)
// // expected output: true

// console.log(descriptor1)
// // expected output: 42

// let n = 9007199254740990

// console.log(n)

// console.log( 0.1 + 0.2 == 0.3);
// console.log(Math.abs(0.1 + 0.2))
// console.log(Number.EPSILON)
// console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);

// const mySymbol = Symbol('my symbol')
// const syObj = { [mySymbol]: 1, mySymbol: 2 }
// // console.log(syObj)
// // console.log(syObj[mySymbol])
// // console.log(syObj.mySymbol)
// for (let v in syObj) {
//     console.log(v)
// }
// const obj = new Object
// obj[Symbol.iterator] = function () {
//     let v = 0
//     return {
//         next: function () {
//             return { value: v++, done: v > 10 }
//         }
//     }
// }
// console.log(obj)
// for (let v of obj) {
//     console.log(v)
// }

// Symbol.prototype.hello = () => { console.log('hello') }
// const b  = Symbol('b')
// console.log(typeof b)
// b.hello()

// let str = 'string'
// str.pro = 'hello'
// console.log(str.pro + 'world')

// const objNum = new Number(123)
// const objStr = new String('123')
// console.log(typeof objNum)
// console.log(typeof objStr)
// console.log(typeof objNum.valueOf())
// console.log(typeof objStr.valueOf())
// console.log(typeof objNum.toString())
// console.log(typeof objStr.toString())


// function sleep(duration){
//     return new Promise(function(resolve){
//         setTimeout(resolve, duration);
//     })
// }
// async function changeColor(duration,color){
//     document.getElementById("traffic-light").style.background = color;
//     await sleep(duration);

// }
// async function main(){
//     while(true){
//         await changeColor(3000,"green");
//         await changeColor(1000, "yellow");
//         await changeColor(2000, "red");
//     }
// }
// main()

// function showThis(params) {
//     console.log(this)
// }
// const showThisArrow = () => {
//     console.log(this)
// }
// var o = {
//     showThis: showThis,
//     showThisArrow: showThisArrow
// }
// showThis()
// o.showThis()
// showThisArrow()
// o.showThisArrow()

// class C {
//     showThis () {
//         console.log(this)
//     }
// }
// var o = new C()
// var showThis = o.showThis
// showThis()
// o.showThis()


// var a = 1;
// foo();

// var b = 2;
// function foo(){
//     console.log(b); // 2
//     console.log(a); // error
// }

// function foo(a, b, c) {
//     console.log(this)
//     console.log(a, b, c)
// }
// foo.call({}, 1, 2, 3)
// foo.apply({}, [1, 2, 3])


// IIFE 经典运用
// for(var i = 0; i < 20; i ++) {
//     void function(i){
//         var div = document.createElement("div");
//         div.innerHTML = i;
//         div.onclick = function(){
//             console.log(i);
//         }
//         document.body.appendChild(div);
//     }(i);
// }
// for(let i = 0; i < 20; i ++) {
//     var div = document.createElement("div");
//     div.innerHTML = i;
//     div.onclick = function(){
//         console.log(i);
//     }
//     document.body.appendChild(div);
// }

// var c = 1
// function foo () {
//     console.log(c)
//     class c {}
// }
// foo()

// "use strict";
// function f(){
//     console.log(this);
// };
// const a = {hehe: 1}
// f.call(null);


// let num = 2
// switch(num) {
//     case 1:
//         console.log(1);
//     case 2:
//         console.log(2);
//     case 3:
//         console.log(3);
// }

// let a = 101;
// do {
//     console.log(a);
// } while (a < 10) {
//     console.log(a)
// }
// while (a < 10) {
//     console.log(33)
// }

// let o = { a: 10, b: 20}
// Object.defineProperty(o, "c", {enumerable:false, value:30})

// for(let p in o)
//     console.log(p);

for(let e of [1, 2, 3, 4, 5])
    console.log(e);

