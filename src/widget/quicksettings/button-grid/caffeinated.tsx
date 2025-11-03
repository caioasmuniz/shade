import Inhibit from "#/lib/inhibit";
import Adw from "gi://Adw?version=1";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "gnim";

export default () => {
  const inhibit = Inhibit.get_default()
  return <Adw.SplitButton
    cssClasses={createBinding(inhibit, "idle")
      .as(idle => idle ? ["suggested-action", "warning"] : [])}
    popover={
      <Gtk.Popover>
        <Gtk.Box
          orientation={Gtk.Orientation.VERTICAL}
          cssClasses={["linked"]}>
          <Gtk.Button onClicked={() => { }}>
            <Adw.ButtonContent
              iconName={""}
              label="" />
          </Gtk.Button>
          <Gtk.Button onClicked={() => { }}>
            <Adw.ButtonContent
              iconName={""}
              label="" />
          </Gtk.Button>
        </Gtk.Box>
      </Gtk.Popover> as Gtk.Popover}
    widthRequest={150}
    $={self =>
      self.connect("clicked", () => {
        inhibit.idle = !inhibit.idle
      })}>
    <Adw.ButtonContent
      // iconName={"cafe-symbolic"}
      label={createBinding(inhibit, "idle")
        .as(idle => idle ?
          "Caffeinated on" :
          "Caffeinated off")} />
  </Adw.SplitButton>
}

