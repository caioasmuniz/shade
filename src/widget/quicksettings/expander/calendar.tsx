import Gtk from "gi://Gtk?version=4.0"
import GLib from "gi://GLib"
import Adw from "gi://Adw?version=1"

export const Calendar = () =>
  <Gtk.Calendar
    cssClasses={["card"]}
  />

export const CalendarIcon = () =>
  <Gtk.Box spacing={4}>
    <Gtk.Image
      iconName={"x-office-calendar-symbolic"}
      pixelSize={20}
    />
    <Adw.WindowTitle
      title={GLib.DateTime
        .new_now_local().format("%A")?? ""}
      subtitle={GLib.DateTime
        .new_now_local()
        .format("%x") ?? ""}
    />
  </Gtk.Box>