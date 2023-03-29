module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["import", "@typescript-eslint"],
  rules: {
    "import/no-unresolved": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "prettier/prettier": [
      "error",
      {
        tabWidth: 2,
        singleQuote: true,
        printWidth: 120,
        bracketSpacing: true,
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.json"],
      },
    },
  },
};
