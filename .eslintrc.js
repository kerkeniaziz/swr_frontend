module.exports = {
    
    parserOptions: {
        parser: 'babel-eslint',  
      ecmaVersion: 2018,
      sourceType: 'module',
      jsx: true 
    },
    plugins: ['vue'],
    extends: ['eslint:recommended' , 'plugin:vue/vue3-recommended'],
    rules: {
        // 'vue/jsx-uses-vars': 'off',
        // 'vue/valid-template-root': 'off',
         //  'no-console': ['error', { allow: ['warn', 'error'] }],
           'vue/no-v-html': 'off',
           'vue/v-on-event-hyphenation': 'off',
      // "max-len": ["error", { "code": 160 }],
          'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }]
    },
    env: {
        browser: true,
        node: true,
        
        },
      globals: {
        localStorage: true
      }
  };
  