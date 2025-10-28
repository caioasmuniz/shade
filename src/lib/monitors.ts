import AstalHyprland from "gi://AstalHyprland?version=0.1"
import Gdk from "gi://Gdk?version=4.0"
import Gio from "gi://Gio?version=2.0"
import { createState } from "gnim"

const Gdk2HyprMonitor =
  (GMonitor: Gdk.Monitor) => {
    const hyprland = AstalHyprland.get_default()
    const monitor = hyprland.get_monitors()
      .find(m => m.model === GMonitor.model)
    return monitor ?? hyprland.get_monitor(0)
  }

const monitors = () => {
  const display = Gdk.Display.get_default()!
  const monitorList = display.get_monitors()

  const getMonitors = () => {
    return Array.from(monitorList as Gio.ListStore<Gdk.Monitor>)
  }

  const [monitors, setMonitors] = createState(getMonitors())

  monitorList.connect("notify", () => {
    setMonitors([])
    setMonitors(getMonitors())
  })
  return monitors
}

export { Gdk2HyprMonitor, monitors }