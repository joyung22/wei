# 猜數字遊戲

一個經典的 1-100 猜數字 React 遊戲，使用 Vite、TypeScript 和 Tailwind CSS 構建。

## 功能

- 🎮 互動式豐富的遊戲體驗，有趣的故事敘述
- 📊 追蹤猜測次數
- 🎨 使用 Tailwind CSS 的現代化 UI
- ⚡ 由 Vite 提供的快速開發體驗
- 🔐 支援 Gemini AI API 整合

## 安裝與運行

**前置需求：** Node.js 18 或更高版本

### 本地開發

1. 安裝依賴：
   ```bash
   npm install
   ```

2. 建立 `.env.local` 檔案並設定 Gemini API 金鑰：
   ```bash
   cp .env.example .env.local
   ```
   編輯 `.env.local` 並添加你的 API 金鑰：
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
   應用將在 `http://localhost:3000` 開啟

## 可用命令

- `npm run dev` - 啟動開發伺服器
- `npm run build` - 為生產環境構建應用
- `npm run preview` - 預覽構建結果
- `npm run clean` - 清除構建輸出
- `npm run lint` - 執行 TypeScript 檢查

## 部署到 GitHub Pages

此項目已配置為自動使用 GitHub Actions 部署到 GitHub Pages。

### 自動部署

1. 確保 GitHub 倉庫設定啟用了 GitHub Pages：
   - 進入 **Settings > Pages**
   - 在 **Source** 選擇 **Deploy from a branch**
   - 在 **Branch** 選擇 **gh-pages** 和 **/ (root)**

2. 每當您推送到 `main` 分支時，GitHub Actions 會自動：
   - 安裝依賴
   - 構建項目
   - 部署到 GitHub Pages

3. 訪問您的應用：
   - URL: `https://joyung22.github.io/WEI/`

### 本地預覽構建結果

```bash
npm run build
npm run preview
```

## 專案結構

```
src/
├── App.tsx       # 主要遊戲元件
├── main.tsx      # 應用程式進入點
└── index.css     # 全域樣式
```

## 技術棧

- **前端框架：** React 19
- **構建工具：** Vite 6
- **語言：** TypeScript
- **樣式：** Tailwind CSS 3
- **動畫：** Motion
- **圖標：** Lucide React
- **AI 整合：** Google Generative AI

## 許可證

MIT
