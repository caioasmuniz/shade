import { createState } from "gnim"
import applauncher from "./applauncher"
import bar from "./bar"
import { LockScreen } from "./lockscreen"
import notifications from "./notifications"
import osd from "./osd"
import quicksettings from "./quicksettings"
import settings from "./settings"
import { Wallpaper } from "./wallpaper"

export const [launcherOpen, setLauncherOpen] = createState(false)
export const [qsOpen, setQsOpen] = createState(false)
export const [screenlocked, setScreelocked] = createState(false)

export const widgets = () => {
  Wallpaper()
  bar()
  osd()
  applauncher()
  notifications()
  quicksettings()
  LockScreen()
  settings()
}