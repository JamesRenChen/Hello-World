'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
  * @FileDescription: 方法库
  * @Author: renchen@yonyou.com
  * @Date: 2021‎年‎34月‎23‎日，‏‎14:31:36
  * @LastEditors: 最后更新作者
  * @LastEditTime: 最后更新时间
  */

/**
  * @description: 深度冻结对象
  * @param {object} obj 待冻结对象
  * @return void
  */
var DeepFreeze = function DeepFreeze(obj) {
    Object.freeze(obj);
    Object.keys(obj).forEach(function (key, index) {
        if (_typeof(obj[key]) === 'object') {
            DeepFreeze(obj['key']);
        }
    });
};

exports.DeepFreeze = DeepFreeze;