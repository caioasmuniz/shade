import { app } from "#/App";
import { useSettings } from "#/lib/settings";
import Adw from "gi://Adw?version=1";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";

export default () => {
  const settings = useSettings().general
  const fileDialog = Gtk.FileDialog.new()
  fileDialog.set_default_filter(new Gtk.FileFilter({ mimeTypes: ["image/*"] }))

  return <Adw.PreferencesGroup
    title={"Appearance"}
    description={"Set cosmetic options"}>
    <Adw.ActionRow title={"System Theme"}>
      <Adw.ToggleGroup $type="suffix"
        cssClasses={["round"]}
        valign={Gtk.Align.CENTER}
        onNotifyActive={self => settings
          .setColorScheme(self.active)}
        active={settings.colorScheme}
      >
        <Adw.Toggle
          label={"Auto"}
          iconName={"night-light-symbolic"}
        />
        <Adw.Toggle
          label={"Light"}
          iconName={"weather-clear-symbolic"}
        />
        <Adw.Toggle
          label={"Dark"}
          iconName={"weather-clear-night-symbolic"}
        />
      </Adw.ToggleGroup>
    </Adw.ActionRow>
    <Adw.ActionRow
      activatable
      title={"Wallpaper Day"}
      iconName={"image-x-generic-symbolic"}
      onActivated={() => {
        fileDialog.open(app.settings, null, (_, res) =>
          settings.setWallpaperDay(
            fileDialog.open_finish(res).get_path() ?? ""))
      }}>
      <Gtk.Picture
        file={settings.wallpaperDay
          .as(wp => Gio.File.new_for_path(wp))}
        contentFit={Gtk.ContentFit.COVER}
      />
    </Adw.ActionRow>
    <Adw.ActionRow
      activatable
      title={"Wallpaper Night"}
      iconName={"image-x-generic-symbolic"}
      onActivated={() => {
        fileDialog.open(app.settings, null, (_, res) =>
          settings.setWallpaperNight(
            fileDialog.open_finish(res).get_path() ?? ""))
      }}>
      <Gtk.Picture
        file={settings.wallpaperNight
          .as(wp => Gio.File.new_for_path(wp))}
        contentFit={Gtk.ContentFit.COVER}
      />
    </Adw.ActionRow>
  </Adw.PreferencesGroup>
}