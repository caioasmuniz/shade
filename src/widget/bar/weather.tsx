import Weather from "#/lib/weather"
import Gdk from "gi://Gdk?version=4.0"
import Gtk from "gi://Gtk?version=4.0"
import { Accessor, createBinding } from "gnim"
import { Weather as WeatherWidget } from "../quicksettings/expander/weather"
import GWeather from "gi://GWeather?version=4.0"

export const WeatherButton = ({ vertical }:
  { vertical: Accessor<boolean> }) => {
  const weather = createBinding(Weather.get_default(), "info")

  return <Gtk.MenuButton
    direction={vertical.as(v => v ?
      Gtk.ArrowType.RIGHT :
      Gtk.ArrowType.UP)}
    cursor={Gdk.Cursor.new_from_name("pointer", null)}
    popover={<Gtk.Popover
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={[]}
      hasArrow={false}>
      <WeatherWidget />
    </Gtk.Popover> as Gtk.Popover}>
    <Gtk.Box orientation={vertical.as(v => v ?
      Gtk.Orientation.VERTICAL :
      Gtk.Orientation.HORIZONTAL)}
      spacing={4}
    >
      <Gtk.Image
        pixelSize={22}
        iconName={weather.as(w => w.get_icon_name())}
      />
      <Gtk.Label
        cssClasses={["heading"]}
        label={weather.as(w => w.get_value_temp(
          GWeather.TemperatureUnit.CENTIGRADE)[1]
          .toFixed() + "°C"
        )}
      />
    </Gtk.Box>
  </Gtk.MenuButton>
}
