module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  /** 一分钟搞定elsint 规则配置 https://segmentfault.com/a/1190000014230857 */
  rules: {
    /** */
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "quotes": [0], // 引号类型 `` "" ''
    "semi": 'off',
    "space-before-function-paren": "off",
    "no-trailing-spaces": "off",
    "eol-last": "off",
    "no-multi-spaces": 'off',
    "comma-dangle":'off',
    "key-spacing": "off",
    "no-extra-semi": "error" /** 忽略额外的分号 */
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
