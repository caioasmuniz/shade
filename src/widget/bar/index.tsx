import Astal from "gi://Astal?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import Gtk from "gi://Gtk?version=4.0";
import { For, onCleanup } from "gnim";
import { app } from "#/App";
import { Gdk2HyprMonitor, monitors } from "#/lib/monitors";
import { useSettings } from "#/lib/settings";
import SystemIndicators from "./systemIndicators";
import SystemUsage from "./systemUsage";
import Workspaces from "./workspaces";
import Clock from "./clock";
import Launcher from "./launcher";
import { WeatherButton } from "./weather";

export default () => {
  const { position } = useSettings().bar
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor
  const vertical = position.as((p) =>
    p === LEFT || p === RIGHT)

  return <For each={monitors()}>
    {(monitor: Gdk.Monitor) =>
      <Astal.Window
        $={self => {
          app.bar.push(self)
          onCleanup(() => {
            app.bar = app.bar.filter(bar => bar !== self)
            self.destroy()
          })
        }}
        visible
        cssClasses={["card", "background"]}
        marginTop={position.as(p => p === BOTTOM ? 0 : 4)}
        marginLeft={position.as(p => p === RIGHT ? 0 : 4)}
        marginBottom={position.as(p => p === TOP ? 0 : 4)}
        marginRight={position.as(p => p === LEFT ? 0 : 4)}
        application={app}
        gdkmonitor={monitor}
        name={`bar-${monitor.get_description()}`}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={position.as(p =>
          p === TOP ? (TOP | LEFT | RIGHT) :
            p === LEFT ? (TOP | LEFT | BOTTOM) :
              p === BOTTOM ? (RIGHT | LEFT | BOTTOM) :
                (TOP | RIGHT | BOTTOM)
        )}>
        <Gtk.CenterBox
          cssClasses={["bar-centerbox"]}
          orientation={vertical.as(v => v ?
            Gtk.Orientation.VERTICAL :
            Gtk.Orientation.HORIZONTAL)}
        >
          <Gtk.Box
            $type="start"
            cssClasses={["linked"]}
            orientation={vertical.as(v => v ?
              Gtk.Orientation.VERTICAL :
              Gtk.Orientation.HORIZONTAL)}>

            <Launcher />
            <Gtk.Separator />
            <SystemUsage vertical={vertical} />

          </Gtk.Box>

          <Workspaces
            $type={"center"}
            vertical={vertical}
            monitor={Gdk2HyprMonitor(monitor)}
          />

          <Gtk.Box
            $type="end"
            cssClasses={["linked"]}
            orientation={vertical.as(v => v ?
              Gtk.Orientation.VERTICAL :
              Gtk.Orientation.HORIZONTAL)}>
            <WeatherButton vertical={vertical} />
            <Gtk.Separator />
            <Clock vertical={vertical} />
            <Gtk.Separator />
            <SystemIndicators vertical={vertical} />

          </Gtk.Box>
        </Gtk.CenterBox>
      </Astal.Window>
    }
  </For>
}