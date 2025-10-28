import Adw from "gi://Adw"
import Gio from "gi://Gio"
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import GLib from "gi://GLib?version=2.0";
import Astal from "gi://Astal?version=4.0";
import { createRoot } from "gnim";
import { register } from "gnim/gobject"
import { gettext } from "gettext";
import { SettingsProvider } from "./lib/settings";
import { requestHandler } from "./lib/requestHandler";
import { widgets } from "./widget";
import css from "./shade.css"

@register()
export class ShadeShell extends Adw.Application {
  declare osd: Astal.Window
  declare applauncher: Astal.Window
  declare notifications: Astal.Window
  declare bar: Astal.Window[]
  declare quicksettings: Astal.Window
  declare settings: Adw.Window

  constructor() {
    super({
      applicationId: import.meta.domain,
      version: import.meta.version,
      flags: Gio.ApplicationFlags.HANDLES_COMMAND_LINE,
    })
    GLib.set_prgname(import.meta.name)
    GLib.set_application_name(gettext("Shade Shell"))
    this.bar = []
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

  vfunc_command_line(cmd: Gio.ApplicationCommandLine) {
    if (cmd.isRemote)
      requestHandler(cmd)
    else {
      createRoot((dispose) => {
        this.connect("shutdown", dispose)
        this.initCss()
        SettingsProvider(() => widgets())
      })
    }
    return 0;
  }
}
export const app = new ShadeShell();