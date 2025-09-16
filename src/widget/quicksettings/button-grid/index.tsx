import Gtk from "gi://Gtk?version=4.0"
import Powerprofiles from "./powerprofiles"
import DarkMode from "./darkMode"
import Bluetooth from "./bluetooth"

export const ButtonGrid = () => {
  return <Gtk.Grid rowSpacing={4} columnSpacing={4}
    $={(self) => {
      self.attach(<Powerprofiles /> as Gtk.Widget, 0, 0, 1, 1)
      self.attach(<DarkMode /> as Gtk.Widget, 1, 0, 1, 1)
      self.attach(<Bluetooth /> as Gtk.Widget, 0, 1, 1, 1)
    }}>
  </Gtk.Grid>
}