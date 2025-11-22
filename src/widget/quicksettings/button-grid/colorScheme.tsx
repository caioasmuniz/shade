import Adw from "gi://Adw?version=1";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "gnim"
import { ColorScheme, DarkModes } from "#/lib/colorScheme";


export default () => {
  const colorScheme = ColorScheme.get_default()

  return <Adw.SplitButton
    cssClasses={["raised"]}
    widthRequest={150}
    onClicked={() => {
      if (colorScheme.colorScheme === DarkModes.LIGHT)
        return colorScheme.colorScheme = DarkModes.DARK
      if (colorScheme.colorScheme === DarkModes.DARK)
        return colorScheme.colorScheme = DarkModes.LIGHT
      else if (colorScheme.daytime)
        colorScheme.colorScheme = DarkModes.DARK
      else
        colorScheme.colorScheme = DarkModes.LIGHT
    }}
    popover={
      <Gtk.Popover cssClasses={[]}>
        <Gtk.Box
          cssClasses={["linked"]}
          orientation={Gtk.Orientation.VERTICAL}>
          <Gtk.Button onClicked={() =>
            colorScheme.colorScheme = DarkModes.AUTO}>
            <Adw.ButtonContent
              iconName={"night-light-symbolic"}
              label="Automatic" />
          </Gtk.Button>
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
  >
    <Adw.ButtonContent
      iconName={createBinding(colorScheme, "iconName")}
      label={createBinding(colorScheme, "colorScheme")
        .as(c => {
          if (c === DarkModes.AUTO)
            return "Auto"
          if (c === DarkModes.LIGHT)
            return "Light Mode"
          else
            return "Dark Mode"
        })}
    />
  </Adw.SplitButton>
}