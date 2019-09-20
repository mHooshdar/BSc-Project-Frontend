module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    semi: "off",
    'no-trailing-spaces': "off",
    'comma-dangle': "off",
    'arrow-parens': "off",
    'handle-callback-err': "off"
  }
}
