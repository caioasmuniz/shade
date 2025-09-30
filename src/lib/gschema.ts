import { defineSchemaList, Schema } from "gnim-schemas"

const id = import.meta.domain || "@domain@"
const path = `/${id.replaceAll(".", "/")}/`

export const barSchema = new Schema({ id, path })
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

export default defineSchemaList([barSchema])