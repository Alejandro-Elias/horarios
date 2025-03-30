import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals"), // ✅ Se coloca en el array principal
  {
    rules: {
      "react/jsx-pascal-case": ["error", { allowAllCaps: true, ignore: ["page"] }], // ✅ Se mantiene la regla
    },
  },
];
