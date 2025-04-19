# TW Stocks Expo App

這是一個使用 Expo 開發的台股應用程式。

## 環境需求

- Node.js 16.0 或更高版本
- npm 或 yarn
- Expo Go 應用程式（用於手機測試）

## 安裝步驟

1. 克隆專案
```bash
git clone [你的專案URL]
cd twstocks-expo
```

2. 安裝依賴
```bash
npm install
# 或
yarn install
```

## 運行方式

### 開發環境

啟動開發伺服器：
```bash
npm run start
# 或
yarn start
```

### 在手機上測試

1. 安裝 Expo Go 應用程式
   - iOS：App Store 搜尋 "Expo Go"
   - Android：Google Play Store 搜尋 "Expo Go"

2. 確保手機和電腦在同一個 WiFi 網路下

3. 掃描 QR Code
   - Android：使用 Expo Go 應用程式掃描
   - iOS：使用手機相機掃描

### 在模擬器上運行

- Android：按 `a` 鍵啟動 Android 模擬器
- iOS：按 `i` 鍵啟動 iOS 模擬器（需要 Mac）
- Web：按 `w` 鍵在瀏覽器中開啟

## 常見問題解決

1. 如果無法連接到開發伺服器：
   ```bash
   npx expo start --tunnel
   ```

2. 如果需要清除快取：
   ```bash
   npx expo start -c
   ```


## docs.expo.dev/develop/tools/  

[Expo Doctor](https://docs.expo.dev/develop/tools/)

`npx expo-doctor`  
`npx expo install --check`  

## References

docs.expo.dev [publishing-websites](https://docs.expo.dev/guides/publishing-websites/)