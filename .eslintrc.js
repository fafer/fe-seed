module.exports = {
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true,
      "jest":true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "prettier/flowtype",
      "prettier/react",
      "prettier/standard"
    ],
    "parser":"babel-eslint",
    "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "prettier"
    ],
    "settings":{
      "react":{
        "version":"16.8.3"
      }
    },
    "globals":{
    },
    "rules": {
      "no-console":"off",
      "indent": [
        "error",
        2,
        { 
          "SwitchCase": 1,
          "flatTernaryExpressions":false
        }
      ],
      "linebreak-style":"off",
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "off",
        "always"
      ],
      "no-extra-boolean-cast":"off",
      "no-prototype-builtins":"off",
      "valid-jsdoc":"off",
      "class-methods-use-this":"off",
      "require-await":"off",
      "react/jsx-indent-props":[
        "warn",
        2
      ],
      "react/prop-types":"off",
      "react/jsx-boolean-value":[
        "warn",
        "always"
      ],
      "react/jsx-props-no-multi-spaces":"error",
      "react/jsx-tag-spacing":[
        "error",
        {
          "closingSlash": "never",
          "beforeSelfClosing": "always",
          "afterOpening": "never",
          "beforeClosing": "allow"
        }
      ],
      "react/display-name":"off",
      "prettier/prettier": [
        "error",
        {
          "singleQuote": true
        }
      ]
    }
};