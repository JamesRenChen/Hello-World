import 'babel-polyfill'

const fun = () => {
    const obj = {
        a: 1,
        b: 2
    }
    Object.assign(obj, { c: 3 })
    const { a, b, c } = obj

    const promise = new Promise((resolve, reject) => {
        resolve(100)
    })
    promise.then(res => {
        return a + b + c + res
    })
}