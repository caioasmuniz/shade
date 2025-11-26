import Gtk from "gi://Gtk?version=4.0"
import GLib from "gi://GLib"

export const Calendar = () =>
  <Gtk.Calendar
    cssClasses={["card"]}
  />

export const CalendarIcon = () =>
  <Gtk.Box
    spacing={4}
    hexpand
    halign={Gtk.Align.CENTER}>
    <Gtk.Image
      iconName={"x-office-calendar-symbolic"}
      pixelSize={20}
    />
    <Gtk.Box orientation={Gtk.Orientation.VERTICAL}>
      <Gtk.Label
        label={GLib.DateTime
          .new_now_local()
          .format("%A") ?? ""}
      />
      <Gtk.Label
        label={GLib.DateTime
          .new_now_local()
          .format("%x") ?? ""}
      />
    </Gtk.Box>
  </Gtk.Box>