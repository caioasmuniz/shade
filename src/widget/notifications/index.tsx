import Notifd from "gi://AstalNotifd";
import Hyprland from "gi://AstalHyprland";
import Astal from "gi://Astal?version=4.0";
import Gtk from "gi://Gtk?version=4.0";
import { For, createBinding, createState, createComputed } from "gnim";
import Notification from "../common/notification";
import { app } from "#/App";

export default () => {
  const notifd = Notifd.get_default();
  const hyprland = Hyprland.get_default();

  const [notifs, setNotifs] = createState<Notifd.Notification[]>([])

  return <Astal.Window
    $={self => app.notifications = self}
    name={"notifications"}
    margin={12}
    cssClasses={["notifications"]}
    visible={createComputed([notifs, createBinding(notifd, "dontDisturb")],
      (notifs, dnd) => notifs.length > 0 && !dnd)
    }
    anchor={
      Astal.WindowAnchor.RIGHT |
      Astal.WindowAnchor.TOP |
      Astal.WindowAnchor.BOTTOM}
    monitor={createBinding(hyprland, "focusedMonitor")(m => m.id)}
    application={app}>
    <Gtk.Box
      orientation={Gtk.Orientation.VERTICAL}
      spacing={4}
      $={() => notifd.connect("notified",
        (self, id) => {
          setTimeout(() =>
            setNotifs(notifs.get().filter(n => id !== n.id)), 5000)
          setNotifs(notifs.get().concat(notifd.get_notification(id)))
        })}>
      <For each={notifs(n => n.reverse())}>
        {(n: Notifd.Notification) =>
          <Notification
            closeAction={() => setNotifs(
              notifs.get().filter(notif => n !== notif))}
            notif={n} />
        }
      </For>
    </Gtk.Box>
  </Astal.Window > as Astal.Window
}