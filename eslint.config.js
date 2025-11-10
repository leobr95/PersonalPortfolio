// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import * as tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import nextPlugin from "@next/eslint-plugin-next";
import tailwind from "eslint-plugin-tailwindcss";
import prettier from "eslint-config-prettier";

export default defineConfig([
  // Ignorados globales
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      ".turbo/**",
      "coverage/**",
      "next-env.d.ts",
    ],
  },

  // Base JS recomendada
  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Reglas TypeScript recomendadas (sin type-checking para rapidez)
  // Si quieres con type-checking: usa ...tseslint.configs.recommendedTypeChecked
  // y añade parserOptions.project apuntando a tu tsconfig.json.
  ...tseslint.configs.recommended,

  // Aplicamos parser TS para archivos TS/TSX
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        // Descomenta si quieres type-aware rules:
        // project: ["./tsconfig.json"],
        // tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Reglas para React/Next/Import/Tailwind/Accesibilidad
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      // Usamos el plugin de Next directamente (no eslint-config-next)
      "@next/next": nextPlugin,
      tailwindcss: tailwind,
    },
    settings: {
      react: { version: "detect" },
      // Resolver de imports
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      },
      // Tailwind: dónde buscar clases (opcional si usas el plugin)
      tailwindcss: {
        callees: ["classnames", "clsx", "ctl"],
        config: "tailwind.config.js",
      },
    },
    rules: {
      /* Tus reglas base */
      semi: ["error", "always"],
      "prefer-const": "error",

      /* React */
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "warn",

      /* React Hooks */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* Accesibilidad */
      "jsx-a11y/alt-text": "warn",

      /* Imports ordenados */
      "import/order": [
        "warn",
        {
          groups: [["builtin", "external", "internal"], ["parent", "sibling", "index"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      /* Next.js (plugin directo) */
      "@next/next/no-img-element": "warn", // usa <Image/> cuando sea posible (puedes desactivarla por archivo si hace falta)
      "@next/next/no-html-link-for-pages": "off", // App Router: no aplica

      /* Tailwind */
      // Si generas clases dinámicas puedes desactivar esta:
      "tailwindcss/no-custom-classname": "off",
    },
  },

  // Archivos de config (Node puro)
  {
    files: [
      "**/*.{config,cjs,mjs}.js",
      "next.config.*",
      "postcss.config.*",
      "tailwind.config.*",
      "eslint.config.*",
    ],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Desactiva reglas que chocan con Prettier
  prettier,
]);
