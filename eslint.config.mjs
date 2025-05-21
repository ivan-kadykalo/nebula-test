import path from "path";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: path.resolve(),
  recommendedConfig: {
    extends: ["eslint:recommended"],
  },
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "plugin:prettier/recommended",
      "next/core-web-vitals",
    ],
    rules: {
      "no-console": "error",
    },
  }),
];

export default eslintConfig;
