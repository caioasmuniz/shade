import Astal from "gi://Astal?version=4.0"
import Gio from "gi://Gio?version=2.0"
import Gly from "gi://Gly"
import GlyGtk4 from "gi://GlyGtk4"
import Gtk from "gi://Gtk?version=4.0"
import { createBinding, createComputed } from "gnim"
import { ColorScheme, DarkModes } from "#/lib/colorScheme"
import { useSettings } from "#/lib/settings"

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

  return <Astal.Window
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
      file={wp}
      contentFit={Gtk.ContentFit.COVER}
    />
  </Astal.Window>
}

export const GlyWallpaper = () => {
  const file = Gio.File.new_for_path("./assets/catalina.heic")
  const image = Gly.Loader.new(file).load()
  // const [paintable, setPaintable] = createState(
  //   GlyGtk4.frame_get_texture(image.next_frame()))

  //   setInterval(() => {
  //   setPaintable(GlyGtk4.frame_get_texture(image.next_frame()))
  // }, 3000);

  return <Astal.Window
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
      paintable={GlyGtk4.frame_get_texture(image.next_frame())}
      contentFit={Gtk.ContentFit.COVER}
    />
  </Astal.Window>
}