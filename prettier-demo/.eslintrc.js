module.exports = {
    // 表示指定想启用的环境
    "env": {
        "browser": true,
        "es6": true
    },
    // 指定额外配置的选项，如['airbnb']表示使用 AirBnb 的 linting 规则
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    // 设置规则插件
    "plugins": [
        "vue"
    ],
    // 默认规则下 ESlint 使用 espree 进行解析
    "parser": {},
    // 如果将默认解析器更改，需要制定 paserOptions
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    // 定义拓展并通过插件添加的所有规则
    "rules": {
        "semi": ["error", "always"],
        "quote": ["error", "double"]
    }
};