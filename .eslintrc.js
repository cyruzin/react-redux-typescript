module.exports = {
    "extends": [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "node": true
    },
    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "max-lines": ["error", 400],
        "max-len": ["error", 150],
        "no-multiple-empty-lines": ["error", {
            "max": 1
        }],
        "no-trailing-spaces": ["error"],
        "no-extra-semi": ["error"],
        "no-var": ["error"],
        "quotes": ["error", "single"],
        "quote-props": ["error", "as-needed"],
        "object-shorthand": ["error"],
        "semi": ["error", "always"],
        "camelcase": ["error", {
            "properties": "always"
        }],
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/adjacent-overload-signatures": ["error"],
        "@typescript-eslint/interface-name-prefix": ["error", "always"],
        "@typescript-eslint/explicit-member-accessibility": ["error", {
            "accessibility": "off"
        }],
        "@typescript-eslint/member-ordering": ["error"],
        "@typescript-eslint/no-namespace": ["error"],
        "@typescript-eslint/no-require-imports": ["error"]
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};