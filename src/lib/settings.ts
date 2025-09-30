import Gio from "gi://Gio"
import { createSettings } from "gnim-schemas"
import { createContext } from "gnim"
import { barSchema } from "./gschema"

function createAppSettings() {
  const barSettings = new Gio.Settings({ schemaId: barSchema.id })
  const keys = createSettings(barSettings, barSchema)
  return { bar: { barSettings, ...keys } }
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