module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": ["react"],
    "globals": {
        "window": true,
        "history": true,
        "location": true,
    },
    "parser": "babel-eslint",
    "rules": {
        "no-console": [
            "error", {
                "allow": ["warn", "error","log"]
            }
        ],
        //禁止空格和 tab 的混合缩进
        "no-mixed-spaces-and-tabs": [
            "error", "smart-tabs"
        ],
        "indent": [
            "error", 2
        ],
        "linebreak-style": 0,
        "quotes": [
            "error", "single"
        ],
        "semi": [
            "error", "always"
        ],
        "react/jsx-filename-extension": ["warn"],
        "react/jsx-uses-react": ["warn"],
        "react/jsx-uses-vars": ["warn"],
        "no-case-declarations": ["warn"],
        "no-unused-vars": [
            "warn", {
                "vars": "all",
                "args": "after-used",
                "ignoreRestSiblings": false
            }
        ]
    }
};