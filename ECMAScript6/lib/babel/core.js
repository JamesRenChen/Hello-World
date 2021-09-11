'use strict';

var babel = require('babel-core');
var babylon = require('babylon');

// 代码片段
var originCode = '\n    const testCore = () => {\n        return 1 + 1\n    }\n    testCore()\n';

// AST
var originAST = babylon.parse(originCode, {
    allowReturnOutsideFunction: true
});
console.log("originAST", originAST);

// babel-core 配置
var options = {
    presets: 'latest'

    // 字符串转码
};babel.transform(originCode, options);
// => { code, map, ast }

// 文件转码(异步)
babel.transformFile('src/index.js', options, function (err, result) {
    result; // => { code, map, ast }
});

// 文件转码(t同步)
babel.transformFileSync('src/index.js', options);
// => { code, map, ast }

// Babel AST 转码
babel.transformFromAst(originAST, originCode, options);
// => { code, map, ast }