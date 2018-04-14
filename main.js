const { app, BrowserWindow } = require("electron");
const storage = require("electron-json-storage");
const url = require("url");
const path = require("path");

let mainWindow;
app.disableHardwareAcceleration();
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    toolbar: false,
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "mainWindow.html"),
    protocol: "file:",
    slashes: true,
  }));

  mainWindow.setMenu(null);
  // mainWindow.webContents.openDevTools()

});
