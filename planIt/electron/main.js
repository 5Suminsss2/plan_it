import { app, BrowserWindow } from "electron";
import path from "path";
const __dirname = path.resolve();

const createWindow = () => {
  // (1)
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // file 명을 제외한 절대 경로
  console.log(__dirname); // C:/Users/ano/temp

  win.webContents.openDevTools();

  win.loadFile(path.join(__dirname, "dist/index.html"));
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // (3)
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  // (4)
  if (process.platform !== "darwin") {
    app.quit();
  }
});
