# 王雨虹 · 电子简历

涂鸦手账风格的个人电子简历网站。React 19 + TypeScript + Vite 8 构建，
设计参考 scrapbook 拼贴美学：马克笔笔触、手写批注、贴纸叠压、便签数据。

在线地址：（部署 GitHub Pages 后补充）

## 快速开始

```bash
pnpm install   # 首次克隆后安装依赖
pnpm dev       # 开发预览 http://localhost:5173
pnpm build     # 构建生产版本到 dist/
pnpm lint      # 代码检查
```

**导出 PDF 版简历**：浏览器打开页面后 `⌘P` 打印（已适配打印样式）。

## 目录结构

```
├── docs/
│   ├── 优化清单.md      # 美观度优化任务清单（逐项勾选推进）
│   └── 简历内容.md      # 简历文字内容源
├── materials/
│   ├── 王雨虹-产品运营.pdf   # 简历原始 PDF
│   ├── 人像原图.jpg          # 照片原图（压缩后用于站点）
│   └── 参考设计-涂鸦风简历.jpg # 风格参考图
├── screenshots/          # 各阶段验收截图
├── scripts/              # 工具脚本（PDF 文本提取等）
├── public/               # 静态资源
└── src/
    ├── App.tsx           # 页面结构
    ├── App.css           # 涂鸦风样式（笔触/贴纸/时间线等）
    ├── data/resume.ts    # ⭐ 简历内容数据源，改内容改这里
    └── assets/
        ├── photo.jpg           # 展示用压缩人像
        ├── brush-yellow.svg    # 黄色马克笔笔触
        └── brush-green.svg     # 绿色马克笔笔触
```

## 内容维护

- 改简历文字 → `src/data/resume.ts`（唯一数据源）+ 同步 `docs/简历内容.md`
- 关键词荧光高亮自动生效：`App.tsx` 里的 `HL_YELLOW` / `HL_GREEN` 词表控制哪些词刷马克笔
- 优化任务进度见 `docs/优化清单.md`

## 技术栈

React 19 · TypeScript 7 · Vite 8 · oxlint · pnpm
字体：站酷庆科黄油体（标题）/ 马善政楷（手写）/ Noto Sans SC（正文）
