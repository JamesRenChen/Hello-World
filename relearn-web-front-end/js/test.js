
// 从数组中选择一个元素作为基准点
// 排序数组，所有比基准值小的元素摆放在左边，而大于基准值的摆放在右边。每次分割结束以后基准值会插入到中间去。
// 最后利用递归，将摆放在左边的数组和右边的数组在进行一次上述的1和2操作。
// 分而治之！把问题不断切割一半又一半，直到答案水落石出。快排还是把大问题分成了两个小问题，哪怕这两个字问题不一定对等
function quickSort(arr, low, high) {
    const key = arr[low]; // 设定一个基准值
    let start = low; // 开始位置
    let end = high; // 结束为止
    while (end > start) {
        console.log('----------------')
        console.log('start:', start, 'end:', end, 'key:', key)
        // 从后往前比较， 如果结尾值大于等于基准值，end前移一位
        while (end > start && arr[end] >= key) {
            end--;
            console.log(111111111, 'end:', end)
        }
        // 如果结尾值小于等于基准值，交换位置
        if (arr[end] <= key){
            console.log(22222222)
            console.log('startValue', arr[start])
            console.log('endValue', arr[end])
            const temp = arr[end];
            arr[end] = arr[start];
            arr[start] = temp;
            console.log(JSON.stringify(arr))
        }
        // 从前往后比较
        while (end > start && arr[start] <= key) {
            console.log(33333333)
            start++;
        }

        if (arr[start] >= key){
            console.log(4444444444)
            console.log('startValue', arr[start])
            console.log('endValue', arr[end])
            const temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            console.log(JSON.stringify(arr))
        }
    }
    console.log('^^^^^^^^^^^^^^')
    console.log('start:', start, 'end:', end, 'low:', low, 'high:', high)
    console.log(JSON.stringify(arr))
    if (start > low) quickSort(arr, low, start - 1);
    if (end < high) quickSort(arr, end + 1, high);
}

var arr = [10, 9, 8, 7, 6, 5];
var start = 0;
var end = arr.length - 1;
quickSort(arr, start, end); 
console.log('After arr:' + arr); // [1, 5, 9, 12, , 15, 16, 20, 23, 30, 45]


// 冒泡排序
function bSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            // 相邻元素两两对比，元素交换，大的元素交换到后面
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

// Symbol 含义及使用方法
// symbol 英文意思为 符号、象征、标记、记号，在 js 中更确切的翻译应该为 独一无二的值，Symbol 方法接收一个参数，表示对生成的 symbol 值的一种描述
const Symbol1 = Symbol('foo');
const Symbol2 = Symbol('foo');
console.log(Symbol1 === Symbol2); // false
// 作为对象属性 当一个复杂对象中含有多个属性的时候，很容易将某个属性名覆盖掉，利用 Symbol 值作为属性名可以很好的避免这一现象
const name = Symbol('name');
const obj = {
    [name]: 'ClickPaas',
}

// 普通函数和箭头函数的区别
// 箭头函数的this指向规则：
// 箭头函数没有prototype(原型)，所以箭头函数本身没有this
let xxx = () =>{};
console.log(xxx.prototype); // undefined
// 箭头函数的this指向在定义的时候继承自外层第一个普通函数的this。
// 下面栗子中在一个函数中定义箭头函数，然后在另一个函数中执行箭头函数。
let a,
barObj = { msg: 'bar的this指向' };
fooObj = { msg: 'foo的this指向' };
bar.call(barObj); // 将bar的this指向barObj
foo.call(fooObj); // 将foo的this指向fooObj
function foo() {
  a(); // 结果：{ msg: 'bar的this指向' }
}
function bar() {
  a = () => {
    console.log(this, 'this指向定义的时候外层第一个普通函数'); // 
  }; // 在bar中定义 this继承于bar函数的this指向
}
// 不能直接修改箭头函数的this指向
// 上个例子中的foo函数修改一下，尝试直接修改箭头函数的this指向。
// 去修改被继承的普通函数的this指向，然后箭头函数的this指向也会跟着改变
// 在非严格模式下，默认绑定的this指向全局对象，严格模式下this指向undefined

// 箭头函数没有prototype(原型)，所以箭头函数本身没有this
// 箭头函数的this在定义的时候继承自外层第一个普通函数的this。
// 如果箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)
// 箭头函数本身的this指向不能改变，但可以修改它要继承的对象的this。
// 箭头函数的this指向全局，使用arguments会报未声明的错误。
// 箭头函数的this指向普通函数时,它的argumens继承于该普通函数
// 使用new调用箭头函数会报错，因为箭头函数没有constructor
// 箭头函数不支持new.target
// 箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名
// 箭头函数相对于普通函数语法更简洁优雅

// 箭头函数的注意事项及不适用场景
// 箭头函数的注意事项：
// 箭头函数一条语句返回对象字面量，需要加括号
// 箭头函数在参数和箭头之间不能换行
// 箭头函数的解析顺序相对||靠前
// 不适用场景：箭头函数的this意外指向和代码的可读性。

// 圣杯布局之flex：
// left和right定宽为200px，middle自适应
// 给middle设置弹性布局display:flex;
// left和right定宽200px，middle设置为flex:1;


// 构造函数Promise必须接受一个函数作为参数，我们称该函数为handle，handle又包含resolve和reject两个参数，它们是两个函数。
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('FULFILLED')
    }, 1000)
})

const isFunction = variable => typeof variable === 'function'
class MyPromise {
    constructor (handle) {
      if (!isFunction(handle)) {
        throw new Error('MyPromise must accept a function as a parameter')
      }
    }
  }

// 先后顺序：函数调用栈  ——>setTimeout操作（按时延长短）
// 执行顺序：Promise——>其后的.then()——>setTimeout（异步）

console.log('打印'+1);                         //第一个：打印1
setTimeout(function(){                      
    console.log('打印'+2);                     //第六个：打印2 
})
new Promise(function(resolve,reject){
        console.log('打印'+3);                //第二个：打印3
      }).then(                    
  console.log('打印'+4));                     //第三个：打印4                        
console.log('打印'+10);                       //第四个：打印10
new Promise(function(resolve,reject){
      setTimeout(function () {
        console.log('打印'+5);                //第七个：打印5
      });
  }).then(
  console.log('打印'+6));                    //第五个：打印6
setTimeout(function(){
    new Promise(function(resolve,reject){
        console.log('打印'+7);                //第七个：打印7
      });
})

// 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。
// 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
// 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
// 上述过程会不断重复，也就是常说的Event Loop(事件循环)。
