import GWeather from "gi://GWeather?version=4.0"
import GObject, { getter, register, setter } from "gnim/gobject"
import { useSettings } from "./settings";

@register({ GTypeName: "Weather" })
export default class Weather extends GObject.Object {
  static instance: Weather;

  static get_default() {
    if (!this.instance)
      this.instance = new Weather();
    return this.instance;
  }

  #weather: GWeather.Info
  #location: GWeather.Location | undefined

  @getter(GWeather.Info)
  get info() {
    return this.#weather
  }

  @setter(GWeather.Location)
  set location(location: GWeather.Location | undefined) {
    if (!location) return
    this.#location = location
    this.#weather.set_location(location)
    this.#weather.update()
    this.notify("location")
  }

  public init() {
    this.#weather.set_location(
      this.#location?.find_nearest_city(
        useSettings().weather.latitude.get(),
        useSettings().weather.longitude.get()
      ))
    this.#weather.update()
  }

  constructor() {
    super()

    this.#location = GWeather.Location.get_world() ?? undefined
    this.#weather = GWeather.Info.new(this.#location)

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