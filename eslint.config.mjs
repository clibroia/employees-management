import globals from "globals";
import {pluginJSConfigs} from "@eslint/js";
import eslintConfigESLint from "eslint-config-eslint";
import eslintConfigEslintFormatting from "eslint-config-eslint/formatting";


export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    extends: [
      pluginJSConfigs.recommended,
      ...eslintConfigESLint,
      eslintConfigEslintFormatting
    ]
  }
];