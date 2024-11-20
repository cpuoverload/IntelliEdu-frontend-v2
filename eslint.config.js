import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  ignores: [
    // 忽略构建目录和输出文件
    "dist/*",
    "build/*",
    "out/*",
    "public/*",
    "coverage/*",

    // 忽略 node_modules 目录
    "node_modules/*",

    // 忽略 TypeScript 编译输出目录
    "lib/*",
    "esm/*",
    "cjs/*",
    "types/*",

    // 忽略日志文件
    "logs/*",
    "*.log",

    // 忽略环境变量文件
    ".env",
    ".env.*", // 匹配 .env.development, .env.production 等文件

    // 忽略临时文件和缓存
    "*.tmp",
    "*.temp",
    "*.cache",
    ".cache/*",
    "tmp/*",
    "temp/*",
    ".vscode/*",
    ".idea/*",
    ".DS_Store",

    // 忽略文档和其他静态文件
    "*.md",
    "docs/*",
    "images/*",
    "*.png",
    "*.jpg",
    "*.jpeg",
    "*.gif",
    "*.svg",

    // 忽略配置文件备份
    "*.bak",
    "*.backup",

    // 忽略测试结果和报告
    "test-results/*",
    "*.test.js.snap",
    "*.test.ts.snap",
    "jest/*",
    "__snapshots__/*",

    // 忽略依赖包锁定文件（如果不需要进行代码质量检查）
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",

    // 忽略配置文件（如果不需要进行代码质量检查）
    "*.config.js",
    "*.config.ts",
    "webpack.config.js",
    "rollup.config.js",
    "vite.config.js",
    "babel.config.js",
    ".eslintrc.js",
    ".prettierrc.js",

    // 忽略特定的语言和框架生成的文件
    "*.min.js",
    "*.min.css",
    "*.map",
    "*.swp",
    "*.swo",
  ],
});
