import Adw from "gi://Adw?version=1";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "gnim"
import Darkman, { DarkModes } from "../../../lib/darkman";


export default () => {
  const darkman = Darkman.get_default()

  return <Adw.SplitButton
    cssClasses={["raised"]}
    popover={
      <Gtk.Popover>
        <Gtk.Box
          orientation={Gtk.Orientation.VERTICAL}
          cssClasses={["linked"]}>
          <Gtk.Button onClicked={() =>
            darkman.colorScheme = DarkModes.LIGHT}>
            <Adw.ButtonContent
              iconName={"weather-clear-symbolic"}
              label="Light Mode" />
          </Gtk.Button>
          <Gtk.Button onClicked={() =>
            darkman.colorScheme = DarkModes.DARK}>
            <Adw.ButtonContent
              iconName={"weather-clear-night-symbolic"}
              label="Dark Mode" />
          </Gtk.Button>
        </Gtk.Box>
      </Gtk.Popover> as Gtk.Popover}
    widthRequest={150}
    $={self =>
      self.connect("clicked", () => {
        if (darkman.colorScheme === DarkModes.LIGHT)
          darkman.colorScheme = DarkModes.DARK
        else
          darkman.colorScheme = DarkModes.LIGHT
      })}
  >
    <Adw.ButtonContent
      iconName={createBinding(darkman, "iconName")}
      label={createBinding(darkman, "colorScheme")
        .as(c => c === DarkModes.DARK ?
          "Dark Mode" : "Light Mode")}
    />
  </Adw.SplitButton>
}