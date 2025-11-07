import Adw from "gi://Adw?version=1";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "gnim"
import { ColorScheme, DarkModes } from "#/lib/colorScheme";


export default () => {
  const colorScheme = ColorScheme.get_default()

  return <Adw.SplitButton
    cssClasses={["raised"]}
    popover={
      <Gtk.Popover>
        <Gtk.Box
          orientation={Gtk.Orientation.VERTICAL}
          cssClasses={["linked"]}>
          <Gtk.Button onClicked={() =>
            colorScheme.colorScheme = DarkModes.LIGHT}>
            <Adw.ButtonContent
              iconName={"weather-clear-symbolic"}
              label="Light Mode" />
          </Gtk.Button>
          <Gtk.Button onClicked={() =>
            colorScheme.colorScheme = DarkModes.DARK}>
            <Adw.ButtonContent
              iconName={"weather-clear-night-symbolic"}
              label="Dark Mode" />
          </Gtk.Button>
        </Gtk.Box>
      </Gtk.Popover> as Gtk.Popover}
    widthRequest={150}
    $={self =>
      self.connect("clicked", () => {
        if (colorScheme.colorScheme === DarkModes.LIGHT)
          colorScheme.colorScheme = DarkModes.DARK
        else
          colorScheme.colorScheme = DarkModes.LIGHT
      })}
  >
    <Adw.ButtonContent
      iconName={createBinding(colorScheme, "iconName")}
      label={createBinding(colorScheme, "colorScheme")
        .as(c => c === DarkModes.DARK ?
          "Dark Mode" : "Light Mode")}
    />
  </Adw.SplitButton>
}