import { defineSchemaList, Schema } from "gnim-schemas"

const id = import.meta.domain || "@domain@"
const path = `/${id.replaceAll(".", "/")}/`

export const barSchema = new Schema({
  id: id + ".bar",
  path: path + "bar/"
})
  .key("position", "i", {
    default: 8,
    summary: "The position of the bar in the screen",
  })
  .key("temp-path", "s", {
    default: "",
    summary: "Path to the temperature sensor file",
  })
  .key("system-monitor", "s", {
    default: "",
    summary: "The System Monitor to be opened when clicking systemUsage widget",
  })
  .key("show-disk-usage", "b", {
    default: false,
    summary: "Wheter to show disk use in systemUsage"
  })

export const weatherSchema = new Schema({
  id: id + ".weather",
  path: path + "weather/"
})
  .key("latitude", "d", {
    default: 0.0,
  })
  .key("longitude", "d", {
    default: 0.0,
  })

export default defineSchemaList([barSchema, weatherSchema])