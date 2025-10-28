import Gtk from "gi://Gtk?version=4.0"
import Powerprofiles from "./powerprofiles"
import DarkMode from "./darkMode"
import Bluetooth from "./bluetooth"

export const ButtonGrid = ({ cols = 2 }:
  { cols?: number }) => {
  const items = [
    <Powerprofiles />,
    <DarkMode />,
    <Bluetooth />,
  ];

  return <Gtk.Grid rowSpacing={4} columnSpacing={4}
    $={(self) => items.forEach(
      (item, index) =>
        self.attach(
          item as Gtk.Widget,
          index % cols,
          index / cols,
          1, 1
        )
    )}>
  </Gtk.Grid>
}