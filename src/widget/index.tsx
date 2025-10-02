import applauncher from "./applauncher"
import bar from "./bar"
import notifications from "./notifications"
import osd from "./osd"
import quicksettings from "./quicksettings"
import settings from "./settings"
import { App } from "#/App"

export const widgets = (app: App) => {
  osd({
    app: app,
    $: (self) => (app.osd = self)
  })
  applauncher({
    app: app,
    $: (self) => (app.applauncher = self)
  })
  notifications({
    app: app,
    $: (self) => (app.notifications = self)
  })
  quicksettings({
    app: app,
    $: (self) => (app.quicksettings = self)
  })
  bar({
    app: app,
    $: (self) => (app.bar = self)
  })
  settings({
    app: app,
    $: (self) => (app.settings = self)
  })
}