import Gio from "gi://Gio"
import { createSettings } from "gnim-schemas"
import { createContext } from "gnim"
import { barSchema, generalSchema, weatherSchema } from "./gschema"

function createAppSettings() {
  const barSettings = new Gio.Settings({ schemaId: barSchema.id })
  const weatherSettings = new Gio.Settings({ schemaId: weatherSchema.id })
  const generalSettings = new Gio.Settings({ schemaId: generalSchema.id })
  return {
    bar: {
      barSettings,
      ...createSettings(barSettings, barSchema)
    },
    general: {
      generalSettings,
      ...createSettings(generalSettings, generalSchema)
    },
    weather: {
      weatherSettings,
      ...createSettings(weatherSettings, weatherSchema)
    }
  }
}

type Settings = ReturnType<typeof createAppSettings>

const SettingsContext = createContext<Settings | null>(null)

export function SettingsProvider<T>(fn: () => T) {
  return SettingsContext.provide(createAppSettings(), fn)
}

export function useSettings() {
  const settings = SettingsContext.use()
  if (!settings) throw Error("settings not in scope")
  return settings
}