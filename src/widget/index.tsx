import { createState } from "gnim"
import applauncher from "./applauncher"
import bar from "./bar"
import { LockScreen } from "./lockscreen"
import notifications from "./notifications"
import osd from "./osd"
import quicksettings from "./quicksettings"
import settings from "./settings"
import { Wallpaper } from "./wallpaper"

export const [screenlocked, setScreelocked] = createState(false)

export const widgets = () => {
  osd()
  applauncher()
  notifications()
  quicksettings()
  bar()
  Wallpaper()
  LockScreen()
  settings()
}