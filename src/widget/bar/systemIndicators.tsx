import Bluetooth from "gi://AstalBluetooth"
import Notifd from "gi://AstalNotifd"
import Network from "gi://AstalNetwork"
import Batery from "gi://AstalBattery"
import Wireplumber from "gi://AstalWp"
import PowerProf from "gi://AstalPowerProfiles"
import Gdk from "gi://Gdk?version=4.0"
import Gtk from "gi://Gtk?version=4.0"
import { Accessor, createBinding, createComputed, createConnection } from "gnim"
import { app } from "#/App"
import Weather from "#/lib/weather"

export default ({ vertical }: { vertical: Accessor<boolean> }) => {
  const audio = Wireplumber.get_default()!.audio
  const battery = Batery.get_default()
  const network = Network.get_default()
  const powerprof = PowerProf.get_default()
  const notifd = Notifd.get_default()
  const bluetooth = Bluetooth.get_default()
  const weather = Weather.get_default().info

  const ProfileIndicator = () => <Gtk.Image
    visible={createBinding(powerprof, "activeProfile")
      .as(p => p !== "balanced")}
    iconName={createBinding(powerprof, "iconName")}
    tooltipMarkup={createBinding(powerprof, "active_profile")
      .as(String)}
    pixelSize={18} />

  const DNDIndicator = () => <Gtk.Image
    visible={createBinding(notifd, "dontDisturb")}
    iconName="notifications-disabled-symbolic"
    pixelSize={18} />

  const BluetoothIndicator = () => <Gtk.Image
    iconName="bluetooth-active-symbolic"
    visible={createBinding(bluetooth, "adapter")
      .as(adapter => adapter && adapter.powered)}
    pixelSize={18} />

  const NetworkIndicator = () => {
    const icon = createComputed([
      createBinding(network, "primary"),
      createBinding(network, "wifi"),
      createBinding(network, "wired")],
      (primary, wifi, wired) =>
        primary === Network.Primary.WIFI ?
          wifi.iconName :
          primary === Network.Primary.WIRED ?
            wired.iconName :
            "network-no-route-symbolic")
    return <Gtk.Image
      iconName={icon}
      visible={createBinding(network, "primary")
        .as(p => p !== Network.Primary.UNKNOWN)}
      pixelSize={18} />
  }

  const AudioIndicator = () => <Gtk.Image
    visible={createBinding(audio, "speakers")
      .as(rec => rec.length > 0)}
    iconName={createBinding(audio.default_speaker, "volume_icon")}
    tooltipMarkup={createBinding(audio.default_speaker, "volume")
      .as(v => "Volume: " + (v * 100).toFixed(0).toString() + "%")}
    pixelSize={18} />

  const MicrophoneIndicator = () => <Gtk.Image
    visible={createBinding(audio, "recorders")
      .as(rec => rec.length > 0)}
    iconName={createBinding(audio.default_microphone, "volume_icon")}
    tooltipMarkup={createBinding(audio.default_microphone, "volume")
      .as(v => (v * 100).toFixed(0).toString() + "%")}
    pixelSize={18} />

  const BatteryIndicator = () => <Gtk.Image
    visible={createBinding(battery, "is_present")}
    iconName={createBinding(battery, "batteryIconName")}
    tooltipMarkup={createBinding(battery, "percentage")
      .as((p) => (p * 100).toFixed(0).toString() + "%")}
    pixelSize={18} />

  const WeatherIndicator = ({ vertical }:
    { vertical: Accessor<boolean> | boolean }) =>
    <Gtk.Box orientation={vertical ?
      Gtk.Orientation.VERTICAL :
      Gtk.Orientation.HORIZONTAL}
      spacing={4}
    >
      <Gtk.Image
        pixelSize={22}
        iconName={createConnection("content-loading-symbolic",
          [weather, "updated", () => {
            return weather.get_icon_name()
          }]
        )}
      />
      <Gtk.Label
        cssClasses={["body"]}
        css={"font-size:0.75rem"}
        label={createConnection("--",
          [weather, "updated", () => {
            return weather.get_temp_summary()
          }]
        )}
      />
    </Gtk.Box>

  return <Gtk.ToggleButton
    cursor={Gdk.Cursor.new_from_name("pointer", null)}
    active={createBinding(app.quicksettings, "visible")}
    onClicked={() =>
      app.quicksettings.visible = !app.quicksettings.visible}
    $={self => self.add_controller(
      <Gtk.EventControllerScroll
        flags={Gtk.EventControllerScrollFlags.VERTICAL}
        onScroll={(self, dx, dy) => {
          if (dy > 0)
            audio.default_speaker.volume -= 0.025
          else
            audio.default_speaker.volume += 0.025
        }}
      /> as Gtk.EventController)}>
    <Gtk.Box
      spacing={4}
      orientation={vertical.as(v => v ?
        Gtk.Orientation.VERTICAL :
        Gtk.Orientation.HORIZONTAL)}>
      <ProfileIndicator />
      <BluetoothIndicator />
      <NetworkIndicator />
      <BatteryIndicator />
      <MicrophoneIndicator />
      <AudioIndicator />
      <DNDIndicator />
      <WeatherIndicator vertical={vertical} />
    </Gtk.Box>
  </Gtk.ToggleButton>
}