# 華神·椒麻 極致饗宴 (Huashen Sichuan Cuisine)
現代東方麻辣火鍋與漢源貢椒沸騰水煮魚 · 旗艦官方網站與視覺識別系統 (VIS)

---

## 🚀 部署至 GitHub Pages 完整指南

本專案已完成 GitHub Pages 最佳化配置：
1. **相對路徑配置 (`base: './'`)**：在 `vite.config.ts` 中啟用相對路徑，無論部署在個人帳號子路徑 (`https://<username>.github.io/<repo>/`) 或自訂網域，所有 CSS 樣式、JS 模組與圖片資源均能 100% 正確載入，絕無 404 破圖或樣式失效問題。
2. **自動化 CI/CD 工作流 (`.github/workflows/deploy.yml`)**：已內建官方推薦的 GitHub Actions 流程，每次推送到 `main` 或 `master` 分支即自動建置並發布。
3. **備用一鍵指令 (`npm run deploy`)**：亦支援經典的 `gh-pages` 分支部署模式。

---

### 方法一：GitHub Actions 自動化部署（推薦，零手動維護）

1. **推送專案至 GitHub**：
   ```bash
   # 若尚未關聯遠端倉庫，請先至 GitHub 建立全新 Repository，然後執行：
   git remote add origin https://github.com/<你的用戶名>/<倉庫名稱>.git
   git branch -M main
   git push -u origin main
   ```

2. **啟用 GitHub Pages**：
   * 進入該 GitHub 專案頁面，點擊上方 **Settings**（設定）。
   * 在左側選單點擊 **Pages**。
   * 在 **Build and deployment** 下方的 **Source** 下拉選單中，選擇 **GitHub Actions**。
   * 完成！當程式碼推送到 `main` 時，GitHub Actions 會自動執行 `.github/workflows/deploy.yml`，約 1–2 分鐘即可在 GitHub 提供的網址訪問完整網站。

---

### 方法二：使用 `npm run deploy` 一鍵發布至 `gh-pages` 分支

若習慣使用分支發布：
1. 本地執行：
   ```bash
   npm run deploy
   ```
2. 進入 GitHub 專案頁面的 **Settings** -> **Pages**。
3. 在 **Source** 選擇 **Deploy from a branch**。
4. Branch 選擇 **gh-pages**，資料夾選擇 **/ (root)**，點擊 **Save**。

---

## 🛠 本地開發與打包指令

* **啟動開發伺服器**：`npm run dev`
* **生產環境編譯**：`npm run build`（產出至 `dist/`，並自動產出離線單一檔案 `public/standalone-index.html`）
* **型別與語法檢查**：`npm run lint`
