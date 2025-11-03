import { app } from "#/App";
import Gtk from "gi://Gtk?version=4.0";
import GObject, { getter, register, setter } from "gnim/gobject"

@register({ GTypeName: "IdleInhibit" })
export default class Inhibit extends GObject.Object {
  static instance: Inhibit;
  static get_default() {
    if (!this.instance) this.instance = new Inhibit();
    return this.instance;
  }

  #idle: boolean
  #cookie: number

  @getter(Boolean)
  get idle() {
    return this.#idle;
  }

  @setter(Boolean)
  set idle(state) {
    if (state === this.#idle)
      return
    if (state)
      this.#cookie = app.inhibit(null,
        Gtk.ApplicationInhibitFlags.IDLE,
        "toggled by shade-shell")
    else
      app.uninhibit(this.#cookie)
    this.#idle = state
    this.notify("idle")
  }

  constructor() {
    super();
    this.#idle = false;
    this.#cookie = 0;
  }
}