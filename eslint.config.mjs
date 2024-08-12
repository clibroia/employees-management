import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigESLint from "eslint-config-eslint";
import eslintConfigEslintFormatting from "eslint-config-eslint/formatting";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...eslintConfigESLint,
  eslintConfigEslintFormatting
];