import Apps from "gi://AstalApps"
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import { app } from "#/App";

export default ({ application }: { application: Apps.Application }) =>
  <Gtk.Button
    cursor={Gdk.Cursor.new_from_name("pointer", null)}
    cssClasses={["app-button"]}
    onClicked={() => {
      app.applauncher.visible = false;
      application.launch();
    }}>
    <Gtk.Box spacing={8}>
      <Gtk.Image
        iconName={application.iconName || ""}
        pixelSize={48} />
      <Gtk.Box orientation={Gtk.Orientation.VERTICAL}>
        <Gtk.Label
          wrap
          cssClasses={["title-2"]}
          label={application.name}
          xalign={0} />
        <Gtk.Label
          cssClasses={["body"]}
          label={application.description}
          xalign={0}
          maxWidthChars={25}
          wrap />
      </Gtk.Box>
    </Gtk.Box>
  </Gtk.Button>