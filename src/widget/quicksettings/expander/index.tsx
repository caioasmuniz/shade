import Gtk from "gi://Gtk?version=4.0"
import { createState } from "gnim"
import { Battery, BatteryIcon } from "./battery"
import { Media, MediaIcon } from "./media"
import { Calendar, CalendarIcon } from "./calendar"

export const Expander = () => {
  const [visible, setVisible] = createState(false)

  const Heading = () => <Gtk.ToggleButton
    onClicked={() =>
      setVisible(!visible.get())}
    active={visible}
    cssClasses={["flat"]}>
    <Gtk.Box>
      <Gtk.Box
        halign={Gtk.Align.CENTER}
        spacing={4}
        hexpand>
        {/* <MediaIcon /> */}
        <CalendarIcon />
        <BatteryIcon />
      </Gtk.Box>
      <Gtk.Image
        halign={Gtk.Align.END}
        iconName={visible.as(v =>
          v ? "go-up-symbolic" : "go-down-symbolic")} />
    </Gtk.Box>
  </Gtk.ToggleButton>

  return <Gtk.Box
    spacing={4}
    orientation={Gtk.Orientation.VERTICAL}>
    <Heading />
    <Gtk.Revealer revealChild={visible}>
      <Gtk.Box
        spacing={4}
        orientation={Gtk.Orientation.VERTICAL}>
        <Media />
        <Calendar />
        <Battery />
      </Gtk.Box>
    </Gtk.Revealer>
  </Gtk.Box>
}