module.exports = {
    env: {
        node: true,
        commonjs: true,
        es6: true,
        mocha: true
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        'no-console': 0,
        'space-infix-ops': 2,
        camelcase: [2, { properties: 'never' }],
        'brace-style': [2, '1tbs', { allowSingleLine: true }],
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],
        'space-before-blocks': ['error', 'always'],
        'keyword-spacing': ['error', { before: true, after: true }],
        'no-mixed-spaces-and-tabs': 'error',
        semi: ['error', 'always']
    }
};
