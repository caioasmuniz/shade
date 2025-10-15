import Hyprland from "gi://AstalHyprland"
import Astal from "gi://Astal?version=4.0";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "gnim";
import { app } from "#/App";
import { useSettings } from "../../lib/settings";
import { NotificationList } from "./notificationList";
import { TrayBox } from "./tray";
import { AudioConfig, BrightnessSlider, MicConfig } from "./sliders";
import { ButtonGrid } from "./button-grid";
import { Expander } from "./expander";

export default () => {

  const barCfg = useSettings().bar
  const hyprland = Hyprland.get_default()
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

  return <Astal.Window
    $={self => app.quicksettings = self}
    margin={12}
    application={app}
    name={"quicksettings"}
    cssClasses={["card", "frame"]}
    css={"padding-right:0px;"}
    anchor={barCfg.position.as(p =>
      TOP | (p === LEFT ? LEFT : RIGHT) | BOTTOM
    )}
    monitor={createBinding(hyprland, "focusedMonitor")
      .as(m => m.id)}>
    <Gtk.ScrolledWindow
      propagateNaturalHeight
      hscrollbarPolicy={Gtk.PolicyType.NEVER}
      vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
      vexpand
      hexpand>
      <Gtk.Box spacing={8}
        css={"padding-right: 12px;"}
        orientation={Gtk.Orientation.VERTICAL}>
        <ButtonGrid />
        <BrightnessSlider />
        <AudioConfig />
        <MicConfig />
        <TrayBox app={app} />
        <Expander />
        <NotificationList />
      </Gtk.Box>
    </Gtk.ScrolledWindow>
  </Astal.Window>
}
