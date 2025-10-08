import Gdk from "gi://Gdk?version=4.0";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "gnim";
import { app } from "#/App";

export default () => {
  return <Gtk.ToggleButton
    cursor={Gdk.Cursor.new_from_name("pointer", null)}
    active={createBinding(app.applauncher, "visible")}
    onClicked={() =>
      app.applauncher.visible = !app.applauncher.visible
    }>
    <Gtk.Image
      iconName={"nix-snowflake"}
      pixelSize={24}
    />
  </Gtk.ToggleButton>
}
