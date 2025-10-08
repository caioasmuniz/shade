import applauncher from "./applauncher"
import bar from "./bar"
import notifications from "./notifications"
import osd from "./osd"
import quicksettings from "./quicksettings"
import settings from "./settings"

export const widgets = () => {
  osd()
  applauncher()
  notifications()
  quicksettings()
  bar()
  settings()
}