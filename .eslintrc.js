module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        // 支持所有的 ECMAScript 规范
        ecmaVersion: 6,
        // 使用 ES6 的模块导入规范
        sourceType: 'module',
        parser: '@babel/eslint-parser'
    },
    rules: {
        // 语法校验类
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 最佳实践类
        'array-callback-return': 'error', // 强制数组方法的回调函数中有 return 语句, 如: Array.filter()
        'block-scoped-var': 'error', // 把 var 语句看作是在块级作用域范围之内
        'eqeqeq': 'error', // 要求使用 === 和 !==
        // 代码风格类
        'semi': ['error', 'never'], // 强制不写入分号
        'quotes': ['error', 'single'], // 强制使用一致的反勾号、单引号
        'array-bracket-newline': ['error', 'consistent'], // 在数组开括号后和闭括号前强制换行
        'array-bracket-spacing': ['error', 'never'], // 数组内部使用一致的空格
        'comma-dangle': ['error', 'never'], // 要求或禁止末尾逗号
        'eol-last': ['error', 'always'], // 要求或禁止文件末尾保留一行空行
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'spaced-comment': ['error', 'always'], // 要求或禁止在注释前有空白
        'space-infix-ops': ['error', { 'int32Hint': false }], // 要求中缀操作符周围有空格
        'space-in-parens': ['error', 'never'], // 禁止圆括号内的空格
        'space-before-function-paren': ['error', 'never'], // 禁止函数圆括号之前有一个空格
        'switch-colon-spacing': ['error', { 'after': true, 'before': false }], // 强制在 switch 的冒号左无空格 右边有空格
        'wrap-regex': 'error', // 强制正则表达式加括号
        'arrow-spacing': ['error', { 'before': true, 'after': true }], // 要求箭头函数的箭头之前或之后有空格
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
        'prefer-arrow-callback': 'error', // 要求使用箭头函数作为回调
        'prefer-const': 'error' // 未变更过的值强制使用 const 进行定义
    }
}
