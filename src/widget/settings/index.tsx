import Adw from "gi://Adw?version=1";
import Gtk from "gi://Gtk?version=4.0";
import Bar from "./bar";
import { app } from "#/App";
import Weather from "./weather";
import General from "./general";
import Network from "./network";

export default () => {
  // const stack = new Adw.ViewStack()
  return <Adw.Window
    $={self => app.settings = self}
    hideOnClose
    name={"settings"}
    application={app}
    cssClasses={["background"]}
    title={"Shade Settings"}>
    <Gtk.Box orientation={Gtk.Orientation.VERTICAL}>
      <Adw.HeaderBar
        titleWidget={
          <Adw.WindowTitle
            title={"Shade Settings"}
            cssClasses={["title-2"]}
          /> as Gtk.Widget} />
      <Adw.PreferencesPage>
        <General />
        <Bar />
        <Weather />
        <Network />
      </Adw.PreferencesPage>
    </Gtk.Box>
  </Adw.Window >
}