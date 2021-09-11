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
const DeepFreeze = (obj) => {
    Object.freeze(obj)
    Object.keys(obj).forEach((key, index) => {
        if (typeof obj[key] === 'object') {
            DeepFreeze(obj['key'])
        }
    })
}


export {
    DeepFreeze
}

