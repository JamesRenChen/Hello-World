'use strict';

require('babel-polyfill');

var fun = function fun() {
    var obj = {
        a: 1,
        b: 2
    };
    Object.assign(obj, { c: 3 });
    var a = obj.a,
        b = obj.b,
        c = obj.c;


    var promise = new Promise(function (resolve, reject) {
        resolve(100);
    });
    promise.then(function (res) {
        return a + b + c + res;
    });
};