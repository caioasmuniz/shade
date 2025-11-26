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
      <Gtk.Popover cssClasses={[]}>
        <Gtk.Box
          cssClasses={["linked"]}
          orientation={Gtk.Orientation.VERTICAL}>
          <Gtk.Button onClicked={() =>
            inhibit.idle = true}>
            <Adw.ButtonContent
              iconName={"radio-checked-symbolic"}
              label={"Caffeinated on"} />
          </Gtk.Button>
          <Gtk.Button onClicked={() =>
            inhibit.idle = false}>
            <Adw.ButtonContent
              iconName={"radio-symbolic"}
              label={"Caffeinated off"} />
          </Gtk.Button>
        </Gtk.Box>
      </Gtk.Popover> as Gtk.Popover}
    widthRequest={150}
    $={self =>
      self.connect("clicked", () => {
        inhibit.idle = !inhibit.idle
      })}>
    <Adw.ButtonContent
      iconName={createBinding(inhibit, "idle")
        .as(idle => idle ?
          "radio-checked-symbolic" :
          "radio-symbolic")}
      label={createBinding(inhibit, "idle")
        .as(idle => idle ?
          "Caffeinated on" :
          "Caffeinated off")} />
  </Adw.SplitButton>
}

