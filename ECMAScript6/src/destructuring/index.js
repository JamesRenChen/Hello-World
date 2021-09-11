// let [a = 1, c = 2] = ['', undefined, 3]

// console.log(a)
// console.log(c)

// let temp1 = {}
// let temp2 = []

// let obj = {
//     p: [
//         'hello',
//         { y: 'world' }
//     ],
//     foo: 123,
//     bar: true
// }

// let { p, p: [x, { y }] } = obj;
// ({ foo: temp1.foo, bar: temp2[0] } = obj)

// console.log(p)
// console.log(x)
// console.log(y)
// console.log(temp1)
// console.log(temp2)

// let arr = [1, 2, 3]
// let { 0: first, [arr.length - 1]: last } = arr

// console.log(first)
// console.log(last)

let x = 1;
let y = 2;

[x, y] = [y, x]

// 返回一个数组
function example() {
    return [1, 2, 3]
}
let [a, b, c] = example()

// 返回一个对象
function example2() {
    return { foo: 1, bar: 2 }
}
let { foo, bar } = example2()

function f1([x, y, z]) {
    
}

function f2({ x, y, z }) {
    
}

let map1 = new Map()
map1.set('a', 'haha')
map1.set('b', 'hehe')
console.log('map1 is ' + map1)

for (let [key, value] of map1) {
    console.log(key + ' is ' + value)
}



