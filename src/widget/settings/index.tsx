import Adw from "gi://Adw?version=1";
import Gtk from "gi://Gtk?version=4.0";
import Bar from "./bar";
import { app } from "#/App";

export default () => {
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
        {/* <General /> */}
        <Bar />
      </Adw.PreferencesPage>
    </Gtk.Box>
  </Adw.Window >
}