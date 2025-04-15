import { app, Menu, BrowserWindow } from "electron";
import serve from "electron-serve";
import Main from "./helpers";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
    serve({ directory: "app" });
} else {
    app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let deeplinkUrl: string | null = null;
let mainWindow: BrowserWindow | null = null;

Main(mainWindow, isProd, deeplinkUrl);

app.on("window-all-closed", () => {
    app.quit();
});
