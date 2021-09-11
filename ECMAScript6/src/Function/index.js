function f1(x = 1, y) {
    // console.log([x, y])
}

f1() // [1, undefined]
f1(undefined) // [1, undefined]

function f2(a, b = 1) {}
function f3(...args) {}
function f4(a = 1, b) {}

// console.log(f2.length) // 1
// console.log(f3.length) // 0
// console.log(f4.length) // 0

{
    var x = 1
    function f(x, y = x) {
        console.log(y)
    }
    f(2) // 2
    // 参数 y 的默认值等于变量 x，调用函数时参数形成单独作用域，默认值变量 x 指向第一个参数 x，而不是全局变量 x，所以输出2
}

{
    let x = 1
    function f(y = x) {
        let x = 2
        console.log(y)
    }
    f() // 1
    // 调用函数时参数形成单独作用域，变量 x 本身没有定义，指向全局 x，不受内部 x 影响，变量不存在就会报错
}

{
    let x = 1
    function f(x = x) {
        console.log(x)
    }
    // f() // Uncaught ReferenceError: Cannot access 'x' before initialization
    // x = x 形成单独作用域，实际执行的是 let x = x，因为暂时性死区，报错
}

{
    let foo = 'outer'
    function f(func = x => foo) {
        let foo = 'inner'
        console.log(func())
    }
    f() // 'outer'
    // func 匿名函数，返回值为变量 foo，参数作用域未定义，去外层找。
}

{
    let x = 1
    function f(x, y = function () { x = 2 }) {
        var x = 3
        y()
        console.log(x)
    }
    f() // 3
    console.log(x) // 1
    // 参数作用域，首选声明 x，y。y 是一个匿名函数，内部变量指向同作用域的 x，所以内部 x 和全局 x 都不受影响。如果去掉 var x，那么 x 会指向参数x，为2
}

{
    function throwIfMissing() {
        throw new Error('Missing parameter')
    }

    function foo(x = throwIfMissing()) {
        return x
    }

    // foo()
    // 参数的默认值是 throwIfMissing 函数的运行结果（即函数之后跟一对圆括号），表明参数的默认值不是在定义时执行，而是在运行时执行。如果参数已经赋值，默认值中的函数就不会执行
}

{
    function foo() { }
    console.log(foo.name) // foo

    const func = foo
    console.log(func.name) // foo

    console.log((new Function).name) // anonymous 匿名的

    console.log(foo.bind({}).name) // bound foo
}

{   
    function fun2(val) {
        console.log(val)
    }
    // --------------
    function fun() {
        let m = 1
        let n = 2
        return fun2(m + n)
    }
    fun()
    // 等同于
    function fun() {
        return fun2(3)
    }
    fun()
    // 等同于
    fun2(3)

    /**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {

    // 取出第一个作为开头
    let chart = s[0]
    // 记录最长长度
    let sum = s.length ? 1 : 0
    // 开始依此拼接
    for(let i = 1; i<s.length;i++){
        // ind返回的是字符出现的下标   无则返回-1
        let ind  = chart.indexOf(s[i])
        // 出现过  则截取只留下没有重复的那一部分
        if(ind != -1){
            // 截取
            chart = chart.substring(ind+1)
        }
        // 若拼接的字符串长度超过了上次最长的时候再继续追加
        if(chart.length >= sum){
            sum+=1
        }
        // 拼接字符串
        chart = chart+s[i]
    }
    return sum
};
    lengthOfLongestSubstring('au')
}
