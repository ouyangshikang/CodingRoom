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
    "parser": "babel-eslint",
    // 解析器选项
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    "extends": "standard",
    // required to lint *.vue files
    "plugins": [
        "html"
    ],
    "rules": {
        // 对象字面量项尾不能有逗号
        "comma-dangle": [2, "never"],
        // 必须使用if() {} 的‘{}’
        "curly": 1,
        // 文件末尾强制换行
        "eol-last": 1,
        // 使用 === 替代 ==
        "eqeqeq": 2,
        // 缩进格式
        "indent": [2, 4, {
            "MemberExpression": 0
        }],
        "keyword-spacing": [
            2, {
                before: true,
                after: true,
                overrides: {
                    "catch": {
                        after: false
                    },
                    "for": {
                        after: false
                    },
                    "if": {
                        after: false
                    },
                    "while": {
                        after: false
                    }
                }
            }
        ],
        // 换行分格, unix || windows
        "linebreak-style": ["error", "unix"],
        // 不能有声明后未被使用的变量或参数
        "no-unused-vars": [
            1, { vars: "local", args: "after-used" }
        ],
        // 可以使用cosole
        "no-console": "off",
        //空行最多不能超过3行
        "no-multiple-empty-lines": [2, {"max": 3}],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 字符串单引号
        "quotes": [
            2, "single", "avoid-escape"
        ],
        // 必须分号结尾
        "semi": [1, "always"],
        // 函数定义括号前的空格
        "space-before-function-paren": [2, "never"],
    }
};