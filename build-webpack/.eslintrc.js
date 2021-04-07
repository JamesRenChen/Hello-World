module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "indent": ["error", 4],
        'max-len' : ["error", { code : 300 }]  // 允许最大行长度
    }
}