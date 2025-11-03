import GWeather from "gi://GWeather?version=4.0"
import GObject, { getter, register } from "gnim/gobject"

@register({ GTypeName: "Weather" })
export default class Weather extends GObject.Object {
  static instance: Weather;

  static get_default() {
    if (!this.instance)
      this.instance = new Weather();
    return this.instance;
  }

  #weather: GWeather.Info

  @getter(GWeather.Info)
  get info() {
    return this.#weather
  }

  constructor() {
    super()

    this.#weather = GWeather.Info.new(
      GWeather.Location.get_world()
        ?.find_nearest_city(-23.1, -50.6))

    this.#weather.set_application_id(import.meta.domain)
    this.#weather.set_enabled_providers(GWeather.Provider.MET_NO)
    this.#weather.set_contact_info("caiomuniz888@gmail.com")

    this.#weather.connect("updated",
      () => this.notify("info"))

    this.#weather.update()

    setInterval(() =>
      this.#weather.update(),
      0.25 * 3600000)
  }
}