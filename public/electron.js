"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = __importStar(require("path"));
var electron_router_dom_1 = require("electron-router-dom");
function createWindow() {
    var mainWindow = new electron_1.BrowserWindow({
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
    var fileRoute = (0, electron_router_dom_1.createFileRoute)(path.join(__dirname, "index.html"), "main");
    mainWindow.maximize();
    mainWindow.loadFile.apply(mainWindow, fileRoute);
    // mainWindow.loadFile(path.join(__dirname, "index.html"));
    // mainWindow.loadURL("http://localhost:5173");
}
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length <= 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", function () {
    electron_1.app.quit();
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=electron.js.map