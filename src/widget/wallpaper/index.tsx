import Astal from "gi://Astal?version=4.0"
import Gio from "gi://Gio?version=2.0"
import Gly from "gi://Gly?version=1"
import GlyGtk4 from "gi://GlyGtk4?version=1"
import Gtk from "gi://Gtk?version=4.0"
// import { createState } from "gnim"

export const Wallpaper = () => {
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
      // paintable={paintable}
      paintable={GlyGtk4.frame_get_texture(image.next_frame())}
      contentFit={Gtk.ContentFit.COVER}
    />
  </Astal.Window>
}