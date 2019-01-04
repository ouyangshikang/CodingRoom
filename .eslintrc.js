module.exports = {
    // 可以直接被别人使用
    "root": true,
    // 运行环境
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    // 指定解析器
    "parser": 'babel-eslint',
    // 解析器选项
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "extends": "eslint:recommended",
    // required to lint *.vue files
    "plugins": [
        "html"
    ],
    "rules": {
        "indent": ["error", "tab"], // tab缩进
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"], // 字符串单引号
        "semi": ["error", "always"], // 必须分号结尾
        'no-unused-vars': [
            1, { vars: 'local', args: 'after-used' }
        ],
        "no-console": "off", // 可以使用cosole
        "curly": 1, // 必须使用if() {} 的‘{}’
        "no-multiple-empty-lines": [2, {"max": 3}], //空行最多不能超过3行
        "space-before-function-paren": [2, "never"], // 函数定义括号前的空格
        "comma-dangle": [2, "never"], // 对象字面量项尾不能有逗号
    }
};