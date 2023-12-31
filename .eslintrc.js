module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:i18next/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["tsconfig.json", "./cypress/tsconfig.json"],
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "i18next",
    "react-hooks",
    "plugin",
    "unused-imports",
  ],
  rules: {
    "react/jsx-indent": [2, 2],
    "react/jsx-indent-props": [2, 2],
    indent: [2, 2],
    "react/jsx-filename-extension": [
      2,
      {
        extensions: [".js", ".jsx", ".tsx"],
      },
    ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": "warn",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "warn",
    "react/function-component-definition": "off",
    "no-shadow": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "i18next/no-literal-string": [
      "error",
      {
        markupOnly: true,
        ignoreAttribute: [
          "as",
          "role",
          "data-testid",
          "justify",
          "direction",
          "align",
          "gap",
          "target",
          "border",
          "feature"
        ],
        "react/display-name": "off",
        "@typescript-eslint/prefer-includes": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/method-signature-style": "off",
      },
    ],
    "max-len": [
      "error",
      {
        ignoreComments: true,
        code: 100,
      },
    ],
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "unused-imports/no-unused-imports": "error",
    "plugin/path-checker": ["error", { alias: "@" }],
    "plugin/public-api-imports": [
      "error",
      {
        alias: "@",
        testFilesPatterns: [
          "**/*.test.*",
          "**/*.story.*",
          "**/StoreDecorator.tsx",
        ],
      },
    ],
    "plugin/layer-plugin": [
      "error",
      {
        alias: "@",
        ignoreImportPatterns: ["**/StoreProvider", "**/testing"],
      },
    ],
    "no-param-reassign": "off",
    "no-undef": "off",
    'react/no-unstable-nested-components': 'warning'
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ["**/src/**/*.{test,stories}.{ts, tsx}"],
      rules: {
        "i18next/no-literal-string": "off",
        "max-len": "off",
      },
    },
  ],
};