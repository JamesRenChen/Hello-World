// const a = 2 
// const promise = new Promise((resolve, reject) => {
//     console.log('promise run')
//     if (a === 1) {
//         resolve(a)
//     } else {
//         reject(a)
//     }
// })
// console.log('hi')
// promise.then(resolve => {
//     console.log(resolve)
// }).catch(err => {
//     console.log(err)
// })

// function loadImageAsync (url) {
//     return new Promise((resolve, reject) => {
//         console.log('loadImage')
//         const image = new Image()
//         image.onload = function () {
//             resolve(image)
//         }
//         image.onerror = function () {
//             reject(new Error('Could not load image at' + url))
//         }

//         image.src = url
//     })
// }

// loadImageAsync('./static/img1.png').then(image => {
//     console.log(image)
//     const app = document.querySelector('#app')
//     console.log(app)
//     app.appendChild(image)
// })

// const pro1 = new Promise((resolve, reject) => {
//     setTimeout(() => reject(new Error('fail')), 3000)
// })

// const pro2 = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(pro1, 1000))
// })

// pro2
//     .then(res => {
//         console.log(11111)
//         console.log(res)
//     })
//     .catch(err => {
//         console.log(22222)
//         console.log(err)
//         return err
//     })
//     .then(res => {
//         console.log(33333)
//         console.log(res)
//     })

// const someAsyncThing = function () {
//     return new Promise ((resolve, reject) => {
//         resolve('ok')
//         setTimeout(() => { throw new Error(x + 2)})
//     })
// }
// someAsyncThing().then(() => {
//     console.log('everything is great')
// })

// const p1 = () => {
//     return new Promise((res, rej) => {
//         res('hello')
//     })
// }
// p1()
//     .then((res) => res)
//     // .catch(e => e)
// const p2 = () => {
//     return new Promise((res, rej) => {
//         throw new Error('报错了')
//     })
// }
// p2()
//     .then(res => res)
//     // .catch(e => e)
// Promise.all([p1, p2])
//     .then(res => console.log(res))
//     .catch(e => console.log(e))

// const p = Promise.race([
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             return resolve('requesting')
//         }, 7000)
//     }),
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             return reject(new Error('request timeout'))
//         }, 5000)
//     })
// ])
// p.then(res => console.log(res))
// p.catch(err => console.log(err))

// const foo = 'foo'
// const fooP = Promise.resolve(foo)
// fooP.then(res => console.log(res))

// let thenable = {
//     then: function (resolve, reject) {
//         resolve(42)
//     }
// }
// let p1 = Promise.resolve(thenable)
// p1.then(res => console.log(res))

// let p = Promise.resolve()
// p.then(function () {
//     console.log(222)
// })

// setTimeout(() => {
//     console.log(333)
// }, 0);

// console.log(111)

// let p = Promise.reject('出错了')
// // 等同于
// let pR = new Promise((resolve, reject) => reject('出错了'))

// let thenable = {
//     then: function (resolve, reject) {
//         reject('出错了')
//     }
// }
// const pT = Promise.reject(thenable)
// pT.then(res => console.log(res))

console.log(Promise.prototype)
Promise.prototype.done = function (onFulfilled, onRejected) {
    console.log(this)
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => {
                throw reason
            }, 0)
        })
}
const a = 1
const promise = new Promise((resolve, reject) => {
    console.log('promise run')
    if (a === 1) {
        resolve(a)
    } else {
        reject(a)
    }
})

Promise.prototype.finally = function (callback) {
    let p = this.constructor
    return this.then(
        value => p.resolve(callback()).then(() => value),
        reason => p.reject(callback()).then(() => { throw reason})
    )
}

promise
    .then(resolve => {
        console.log(resolve)
    })
    .finally(() => {
        console.log(527139)
    })
