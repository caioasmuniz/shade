import { register, Object, getter, setter } from "gnim/gobject";
import Weather from "./weather";
import GLib from "gi://GLib?version=2.0";
import Gio from "gi://Gio?version=2.0";
import { createSettings, Schema } from "gnim-schemas";
import { useSettings } from "./settings";
import { Setter } from "gnim";

export enum DarkModes {
  AUTO,
  LIGHT,
  DARK
}

@register({ GTypeName: "ColorScheme" })
export class ColorScheme extends Object {
  static instance: ColorScheme;
  static get_default() {
    if (!this.instance) this.instance = new ColorScheme();
    return this.instance;
  }

  #daytime: boolean
  #colorScheme: DarkModes = 0
  #weather: Weather
  #gsettings: {
    setColorScheme: Setter<string>;
    setGtkTheme: Setter<string>;
  }

  @getter(Number)
  get colorScheme() {
    return this.#colorScheme;
  }

  @getter(String)
  get colorSchemeName() {
    switch (this.#colorScheme) {
      case DarkModes.AUTO:
        return "Auto"
      case DarkModes.LIGHT:
        return "Auto"
      case DarkModes.DARK:
        return "Auto"
    }
  }

  @setter(Number)
  set colorScheme(c) {
    this.#colorScheme = c
    if (c === DarkModes.AUTO)
      c = this.#daytime ?
        DarkModes.LIGHT :
        DarkModes.DARK
    if (c === DarkModes.LIGHT) {
      this.#gsettings.setColorScheme("prefer-light")
      this.#gsettings.setGtkTheme("Adwaita")
    } else {
      this.#gsettings.setColorScheme("prefer-dark")
      this.#gsettings.setGtkTheme("Adwaita-dark")
    }
    this.notify("color-scheme")
  }

  @getter(String)
  get iconName() {
    if (this.#daytime) return "weather-clear-symbolic"
    else return "weather-clear-night-symbolic";
  }

  private timeout() {
    const msUntil = (unixTime: number) =>
      Math.abs(GLib.DateTime.new_from_unix_local(unixTime)
        .difference(GLib.DateTime.new_now_local()))

    const interval = this.#daytime ?
      msUntil(this.#weather.info.get_value_sunset()[1])
      : msUntil(this.#weather.info.get_value_sunrise()[1])

    setTimeout(() => {
      this.#daytime = !this.#daytime
      this.timeout()
    }, interval);
  }

  constructor() {
    super();

    this.#gsettings = createSettings(
      new Gio.Settings({
        schema_id: "org.gnome.desktop.interface"
      }),
      new Schema({
        id: "org.gnome.desktop.interface",
        path: "/org/gnome/desktop/interface/"
      })
        .key("color-scheme", "s", { default: "prefer-light" })
        .key("gtk-theme", "s", { default: "Adwaita" }))

    this.#weather = Weather.get_default()
    this.#daytime = this.#weather.info.is_daytime()
    const settings = useSettings().general.colorScheme
    this.colorScheme = settings.get()

    settings.subscribe(() =>
      this.colorScheme = settings.get())

    this.timeout()
  }
}
