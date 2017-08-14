// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
    }],
    'import/imports-first': 0,
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 80 chars lines
    'max-len': [2, {
      code: 80,
      tabWidth: 2,
      ignoreUrls: true
    }],
    // End files with \n
    'eol-last': 2,
    'no-underscore-dangle': 0,
    'consistent-return': 1,
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'arrow-parens': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  'globals': {
    'window': false,
    'document': false
  }
}