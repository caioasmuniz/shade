import Hyprland from "gi://AstalHyprland"
import Apps from "gi://AstalApps"
import Adw from "gi://Adw?version=1"
import Gtk from "gi://Gtk?version=4.0"
import { createBinding, For, Accessor, With } from "gnim"

const hyprland = Hyprland.get_default()

const apps = new Apps.Apps({
  nameMultiplier: 4,
  entryMultiplier: 1,
  executableMultiplier: 1,
  descriptionMultiplier: 1,
})

const getIcon = (client: Hyprland.Client) => {
  switch (client.class) {
    case "code-url-handler":
      return "vscode"
    default:
      return apps.fuzzy_query(client.class)[0]?.iconName ||
        apps.fuzzy_query(client.title)[0]?.iconName ||
        apps.fuzzy_query(client.initialTitle)[0]?.iconName ||
        "image-missing-symbolic"
  }
}

export default ({ monitor, vertical }:
  { monitor: Hyprland.Monitor, vertical: Accessor<boolean> }) =>
  <Gtk.Box
    orientation={vertical.as(v => v ?
      Gtk.Orientation.VERTICAL :
      Gtk.Orientation.HORIZONTAL)}
    spacing={8}>
    <For each={createBinding(hyprland, "workspaces")
      .as(ws => ws
        .filter(ws => ws.get_monitor() === monitor)
        .sort((a, b) => a.id - b.id)
      )
    }>
      {(ws: Hyprland.Workspace) => <Adw.ToggleGroup
        orientation={vertical.as(v => v ?
          Gtk.Orientation.VERTICAL :
          Gtk.Orientation.HORIZONTAL)}
        cssClasses={[ws.id < 0 ? "success" : ""]}
        activeName={createBinding(hyprland, "focusedClient")
          .as(client => client && client.workspace === ws ?
            client.address : null as unknown as string
          )
        }
      >
        <For each={createBinding(ws, "clients")}>
          {(client: Hyprland.Client) =>
            <Adw.Toggle
              name={client.address}
              iconName={getIcon(client)}
              child={<Gtk.Image
                iconName={getIcon(client)}
                pixelSize={24}
              >
                <Gtk.GestureClick
                  onPressed={() => client.focus()}
                />
              </Gtk.Image> as Gtk.Widget} />}
        </For>
        {/* create toggle when ws is empty */}
        <With value={createBinding(ws, "clients").as(c => c.length < 1)}>
          {(c: boolean) => c ?
            <Adw.Toggle /> : null}
        </With>
      </Adw.ToggleGroup>}
    </For>
  </Gtk.Box> as Gtk.Box