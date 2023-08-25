import { app, BrowserWindow } from "electron";
import * as path from "path";
import { createFileRoute } from "electron-router-dom";

function createWindow() {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#dbf0f0",
    },
    icon: path.join(__dirname, "sunset.png"),
    maximizable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const fileRoute = createFileRoute(
    path.join(__dirname, "../index.html"),
    "main"
  );
  mainWindow.maximize();
  mainWindow.loadFile(...fileRoute);
  // mainWindow.loadFile(path.join(__dirname, "index.html"));
  // mainWindow.loadURL("http://localhost:5173");
}

app.whenReady().then(function () {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length <= 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  app.quit();

  if (process.platform !== "darwin") {
    app.quit();
  }
});
