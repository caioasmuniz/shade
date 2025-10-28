import { app } from "#/App";
import Gio from "gi://Gio?version=2.0";

export const requestHandler =
  (cmd: Gio.ApplicationCommandLine) => {
    const args = cmd.get_arguments()
    
    if (args[1] === "toggle")
      switch (args[2]) {
        case "bar":
          app.bar.forEach(bar => bar.visible = !bar.visible)
          break
        case "applauncher":
          app.applauncher.visible = !app.applauncher.visible
          break
        case "quicksettings":
          app.quicksettings.visible = !app.quicksettings.visible
          break
      }
    cmd.done()
  }