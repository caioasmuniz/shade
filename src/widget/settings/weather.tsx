import { useSettings } from "#/lib/settings";
import Weather from "#/lib/weather";
import Adw from "gi://Adw?version=1";
import Gtk from "gi://Gtk?version=4.0";
import GWeather from "gi://GWeather?version=4.0";

export default () => {
  const settings = useSettings().weather
  const weather = Weather.get_default()

  return <Adw.PreferencesGroup
    title={"Weather"}
    description={"Weather options"}>
    <Adw.SpinRow
      title={"Latitude"}
      value={settings.latitude}
      adjustment={Gtk.Adjustment.new(
        settings.latitude.get(),
        -90.0, 90.0, 10.0, 0, 0
      )}
      onNotifyValue={self =>
        settings.setLatitude(self.value)
      } />
    <Adw.SpinRow
      title={"Longitude"}
      value={settings.longitude}
      adjustment={Gtk.Adjustment.new(
        settings.longitude.get(),
        -180.0, 180.0, 10.0, 0, 0
      )}
      onNotifyValue={self =>
        settings.setLongitude(self.value)
      } />
    <Adw.ButtonRow
      startIconName={"view-refresh-symbolic"}
      title={"update"}
      onActivated={() =>
        weather.location = GWeather.Location.get_world()
          ?.find_nearest_city(
            settings.latitude.get(),
            settings.longitude.get()
          )
      }
    />
  </Adw.PreferencesGroup>
}