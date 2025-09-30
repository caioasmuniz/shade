import Adw from "gi://Adw"
import Gio from "gi://Gio"
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import GLib from "gi://GLib?version=2.0";
import Astal from "gi://Astal?version=4.0";
import { createRoot } from "gnim";
import { register } from "gnim/gobject"
import { SettingsProvider } from "./lib/settings";
import { gettext } from "gettext";
import Osd from "./widget/osd"
import Applauncher from "./widget/applauncher";
import Notifications from "./widget/notifications";
import Bar from "./widget/bar";
import Quicksettings from "./widget/quicksettings";
import Settings from "./widget/settings";
import css from "./stash.css"

@register()
export class App extends Adw.Application {
  declare osd: Astal.Window
  declare applauncher: Astal.Window
  declare notifications: Astal.Window
  declare bar: Astal.Window
  declare quicksettings: Astal.Window
  declare settings: Adw.Window

  constructor() {
    super({
      applicationId: import.meta.domain,
      version: import.meta.version,
      flags: Gio.ApplicationFlags.FLAGS_NONE,
    })
    GLib.set_prgname(import.meta.name)
    GLib.set_application_name(gettext("Stash Shell"))
  }

  private initCss() {
    const provider = new Gtk.CssProvider()
    provider.load_from_data(css, -1)

    Gtk.StyleContext.add_provider_for_display(
      Gdk.Display.get_default()!,
      provider,
      Gtk.STYLE_PROVIDER_PRIORITY_USER,
    )
  }

  vfunc_startup(): void {
    super.vfunc_startup()

    createRoot((dispose) => {
      this.connect("shutdown", dispose)
      this.initCss()
      SettingsProvider(() => {
        Osd({
          app: this,
          $: (self) => (this.osd = self)
        })
        Applauncher({
          app: this,
          $: (self) => (this.applauncher = self)
        })
        Notifications({
          app: this,
          $: (self) => (this.notifications = self)
        })
        Quicksettings({
          app: this,
          $: (self) => (this.quicksettings = self)
        })
        Bar({
          app: this,
          $: (self) => (this.bar = self)
        })
        Settings({
          app: this,
          $: (self) => (this.settings = self)
        })
      })
    })
  }
}