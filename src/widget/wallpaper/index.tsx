import Astal from "gi://Astal?version=4.0"
import Gio from "gi://Gio?version=2.0"
import Gly from "gi://Gly"
import GlyGtk4 from "gi://GlyGtk4"
import Gtk from "gi://Gtk?version=4.0"
import Gdk from "gi://Gdk?version=4.0"
import { createBinding, createComputed, For, onCleanup } from "gnim"
import { ColorScheme, DarkModes } from "#/lib/colorScheme"
import { useSettings } from "#/lib/settings"
import { app } from "#/App"
import { monitors } from "#/lib/monitors"

export const Wallpaper = () => {
  const settings = useSettings().general
  const wp = createComputed([
    createBinding(ColorScheme.get_default(), "colorScheme"),
    createBinding(ColorScheme.get_default(), "daytime"),
    settings.wallpaperDay,
    settings.wallpaperNight],
    (color, daytime, wpDay, wpNight) => {
      if (color === DarkModes.AUTO)
        return Gio.File.new_for_path(daytime ? wpDay : wpNight)
      if (color === DarkModes.LIGHT)
        return Gio.File.new_for_path(wpDay)
      else
        return Gio.File.new_for_path(wpNight)
    }
  )

  return <For each={monitors()}>
    {(monitor: Gdk.Monitor) =>
      <Astal.Window
        $={self => {
          app.wallpaper.push(self)
          onCleanup(() => {
            app.wallpaper = app.wallpaper.filter(w => w !== self)
            self.destroy()
          })
        }}
        gdkmonitor={monitor}
        layer={Astal.Layer.BACKGROUND}
        anchor={
          Astal.WindowAnchor.TOP |
          Astal.WindowAnchor.RIGHT |
          Astal.WindowAnchor.BOTTOM |
          Astal.WindowAnchor.LEFT
        }
        exclusivity={Astal.Exclusivity.IGNORE}
        visible
      >
        <Gtk.Picture
          contentFit={Gtk.ContentFit.COVER}
          paintable={wp.as(wp => GlyGtk4.frame_get_texture(
            Gly.Loader.new(wp).load().next_frame()
          ))}
        />
      </Astal.Window>}
  </For>
}
