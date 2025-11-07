import GWeather from "#/lib/weather";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "gnim";


export const WeatherIcon = () => {
  const weather = GWeather.get_default()
  return < Gtk.Box
    spacing={4}
    hexpand
    halign={Gtk.Align.CENTER} >
    <Gtk.Image
      iconName={createBinding(weather, "info")
        .as(w => w.get_icon_name())}
      pixelSize={20}
    />
    <Gtk.Box orientation={Gtk.Orientation.VERTICAL}>
      <Gtk.Label
        label={createBinding(weather, "info")
          .as(w => w.get_temp_summary())}
      />
      <Gtk.Label
        label={createBinding(weather, "info")
          .as(w => w.get_weather_summary())}
      />
    </Gtk.Box>
  </Gtk.Box >
}

export const Weather = () => {
  const weather = GWeather.get_default()
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