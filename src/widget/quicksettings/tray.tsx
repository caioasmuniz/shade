import { App } from "#/App";
import { useSettings } from "#/lib/settings";
import AstalIO from "gi://AstalIO?version=0.1";
import Tray from "gi://AstalTray";
import Gtk from "gi://Gtk?version=4.0";
import { Accessor, createBinding, For } from "gnim";


export const TrayBox = ({ app }: { app: App }) => {
  const tray = Tray.get_default();

  const LockButton = () => (
    <Gtk.Button
      cssClasses={["circular"]}
      onClicked={() => {
        AstalIO.Process.exec_asyncv(["bash", "-c", "hyprlock --immediate"]);
      }}
    >
      <Gtk.Image iconName={"system-lock-screen-symbolic"} />
    </Gtk.Button>
  );

  const PowerButton = () => (
    <Gtk.Button
      cssClasses={["circular", "destructive-action"]}
      onClicked={() => {
        AstalIO.Process.exec_asyncv(["bash", "-c", "systemctl poweroff"]);
      }}
    >
      <Gtk.Image iconName={"system-shutdown-symbolic"} />
    </Gtk.Button>
  );

  const RotateButton = () => {
    const barCfg = useSettings().bar
    return <Gtk.Button
      cssClasses={["circular"]}
      onClicked={() => {
        if ((barCfg.position as Accessor<any>).get() > 8)
          barCfg.setPosition(2)
        else
          barCfg.setPosition(
            (barCfg.position as Accessor<any>).get() * 2)
      }}>
      <Gtk.Image iconName={"object-rotate-right-symbolic"} />
    </Gtk.Button>
  }

  const SettingsButton = () => <Gtk.Button
    cssClasses={["circular"]}
    onClicked={() => {
      app.settings.visible = true;
      app.quicksettings.visible = false;
    }}>
    <Gtk.Image iconName={"preferences-system-symbolic"} />
  </Gtk.Button>

  return <Gtk.FlowBox
    rowSpacing={4}
    columnSpacing={4}>
    <For each={createBinding(tray, "items")}>
      {((item: Tray.TrayItem) =>
        <Gtk.MenuButton
          cssClasses={["circular"]}
          $={self => {
            self.insert_action_group("dbusmenu", item.actionGroup)
          }}
          tooltipMarkup={createBinding(item, "tooltipMarkup")}
          popover={undefined}
          //actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
          menuModel={item.menuModel}
          tooltip_markup={createBinding(item, "tooltip_markup")}>
          <Gtk.Image gicon={item.gicon} />
        </Gtk.MenuButton>
      )}
    </For>
    <SettingsButton />
    <RotateButton />
    <LockButton />
    <PowerButton />
  </Gtk.FlowBox>
}