module.exports = {
  // 继承一些规则
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  // 配置 ts parser
  parser: '@typescript-eslint/parser',
  // 配置项
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // eslint-plugin-react，注册插件
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  // 自定义语法规则（比较精确 ）
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/react-in-jsx-scope': 'off'
  },
  settings: {
    // Eslint 就会自动探测 React 的版本号
    react: {
      version: 'detect'
    }
  }
};
