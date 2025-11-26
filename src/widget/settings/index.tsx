import Adw from "gi://Adw?version=1";
import Gtk from "gi://Gtk?version=4.0";
import Bar from "./bar";
<<<<<<< HEAD:widget/settings/index.tsx

import app from "ags/gtk4/app";
import Network from "./network";
=======
import { app } from "#/App";
import Weather from "./weather";
import General from "./general";
>>>>>>> main:src/widget/settings/index.tsx

export default () => {
  const stack = new Adw.ViewStack()
  return <Adw.Window
<<<<<<< HEAD:widget/settings/index.tsx
    visible
=======
    $={self => app.settings = self}
>>>>>>> main:src/widget/settings/index.tsx
    hideOnClose
    name={"settings"}
    application={app}
    cssClasses={["background"]}
<<<<<<< HEAD:widget/settings/index.tsx
    title={"Stash Settings"}>
    <Adw.ToolbarView>
      <Adw.HeaderBar $type="top"
        titleWidget={
          <Adw.ViewSwitcher
            stack={stack}
          /> as Gtk.Widget} />
      <Adw.ViewStack
        $={self => self = stack}>
        <Adw.PreferencesPage name={"bar"}>
          <Bar />
        </Adw.PreferencesPage>
        <Network />
      </Adw.ViewStack>
    </Adw.ToolbarView>
=======
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
      </Adw.PreferencesPage>
    </Gtk.Box>
>>>>>>> main:src/widget/settings/index.tsx
  </Adw.Window >
}