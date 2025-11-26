import Gtk from "gi://Gtk?version=4.0"
import { createState } from "gnim"
import { Battery, BatteryIcon } from "./battery"
// import { Media, MediaIcon } from "./media"
import { Calendar, CalendarIcon } from "./calendar"
import { Weather, WeatherIcon } from "./weather"
import Adw from "gi://Adw?version=1"

export const Expander = () => {
  const [visible, setVisible] = createState(false)

  const Heading = () => <Gtk.ToggleButton
    onClicked={() =>
      setVisible(!visible.get())}
    active={visible}
    cssClasses={["flat"]}>
    <Gtk.Box>
      <Adw.WrapBox
        halign={Gtk.Align.CENTER}
        // spacing={4}
        hexpand>
        {/* <MediaIcon /> */}
        <CalendarIcon />
        <BatteryIcon />
        <WeatherIcon />
      </Adw.WrapBox>
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
        {/* <Media /> */}
        <Battery />
        <Weather />
        <Calendar />
      </Gtk.Box>
    </Gtk.Revealer>
  </Gtk.Box>
}