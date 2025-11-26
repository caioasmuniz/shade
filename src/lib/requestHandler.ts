import { app } from "#/App";
import { launcherOpen, qsOpen, setLauncherOpen, setQsOpen } from "#/widget";
import { setScreelocked } from "#/widget";
import Gio from "gi://Gio?version=2.0";

export const requestHandler =
  (cmd: Gio.ApplicationCommandLine) => {
    const args = cmd.get_arguments()

    if (args[1] === "lockscreen")
      setScreelocked(true)
    else if (args[1] === "toggle")
      switch (args[2]) {
        case "bar":
          app.bar.forEach(bar => bar.visible = !bar.visible)
          break
        case "applauncher":
          setLauncherOpen(!launcherOpen.get())
          break
        case "quicksettings":
          setQsOpen(!qsOpen.get())
          break
      }
    cmd.done()
  }