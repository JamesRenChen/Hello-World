// console.log('z')
// console.log('\z')
// console.log('\172')
// console.log('\x7A')
// console.log('\u007A')
// console.log('\u{7A}')

// let text = String.fromCodePoint(0x20BB7)
// console.log(text)

// for (let i = 0; i < text.length; i++) {
//     console.log(text[i])
// }
// for (let i of text) {
//     console.log(i)
// }

// 'x'.repeat(3) // 'xxx'
// console.log()

// 标签模板
let a = 5
let b = 10

function tag1() {
    console.group(arguments)
}

tag1`Hello ${a + b} world ${a * b}`
