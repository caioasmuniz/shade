import Gdk from "gi://Gdk?version=4.0";
import Gtk from "gi://Gtk?version=4.0";
import { launcherOpen, setLauncherOpen } from "..";

export default () => {
  return <Gtk.ToggleButton
    cursor={Gdk.Cursor.new_from_name("pointer", null)}
    active={launcherOpen}
    onClicked={() =>
      setLauncherOpen(!launcherOpen.get())
    }>
    <Gtk.Image
      iconName={"nix-snowflake"}
      pixelSize={24}
    />
  </Gtk.ToggleButton>
}
