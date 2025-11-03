import GWeather from "#/lib/weather";
import Adw from "gi://Adw?version=1";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "gnim";

const weather = GWeather.get_default()

export const WeatherIcon = () =>
  <Gtk.Box spacing={4}>
    <Gtk.Image
      iconName={createBinding(weather, "info")
        .as(w => w.get_icon_name())}
      pixelSize={20}
    />
    <Adw.WindowTitle
      title={createBinding(weather, "info")
        .as(w => w.get_temp_summary())}
      subtitle={createBinding(weather, "info")
        .as(w => w.get_weather_summary())}
    />
  </Gtk.Box>

export const Weather = () => {
  const weatherInfo = createBinding(weather, "info")
  const InfoBox = () =>
    <Gtk.Box
      hexpand
      spacing={4}
      orientation={Gtk.Orientation.VERTICAL}>
      <Gtk.Label
        cssClasses={["title-3"]}
        halign={Gtk.Align.END}
        label={weatherInfo.as(w => w.get_temp_summary())}
      />
      <Gtk.Label
        cssClasses={["title-3"]}
        halign={Gtk.Align.END}
        label={weatherInfo.as(w => w.get_sky())}
      />
      <Gtk.Label
        halign={Gtk.Align.END}
        label={weatherInfo.as(w => `Feels like ${w.get_apparent()}`)}
      />
    </Gtk.Box>

  return <Gtk.Box
    orientation={Gtk.Orientation.VERTICAL}
    cssClasses={["card"]}
    spacing={4}
  >
    <Gtk.Label
      cssClasses={["title-3"]}
      label={"Weather Info"}
      halign={Gtk.Align.CENTER}
    />
    <Gtk.Box>
      <Gtk.Image
        iconName={weatherInfo.as(w => w.get_icon_name())}
        pixelSize={48}
      />
      <InfoBox />
    </Gtk.Box>
    <Gtk.Button
      onClicked={() => {
        weather.info.update()
      }}
      iconName={"view-refresh-symbolic"} />
  </Gtk.Box>

}