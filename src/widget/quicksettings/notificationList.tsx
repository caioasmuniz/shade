import Adw from "gi://Adw?version=1";
import Notifd from "gi://AstalNotifd";
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import { createBinding, createState, For } from "gnim";
import Notification from "../common/notification";

export default () => {
  const notifd = Notifd.get_default();
  const Header = () => {
    const DNDButton = () => <Gtk.ToggleButton
      onClicked={self => notifd.dontDisturb = self.active}
      active={createBinding(notifd, "dontDisturb")}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      iconName={"notifications-disabled-symbolic"}
      cssClasses={createBinding(notifd, "dontDisturb")
        .as(d => d ? ["suggested-action", "warning"] : ["flat"])}
    />

    const ClearAllButton = () => <Gtk.Button
      halign={Gtk.Align.END}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={() => notifd.get_notifications().
        forEach(n => n.dismiss())}>
      <Adw.ButtonContent
        iconName={"edit-clear-all-symbolic"}
        label={"Clear"} />
    </Gtk.Button >

    return <Gtk.Box
      cssClasses={["toolbar"]}>
      <Gtk.Label
        label={"Notifications"}
        cssClasses={["title-1"]}
        hexpand
      />
      <ClearAllButton />
      <DNDButton />
    </Gtk.Box>
  }

  const NotificationGroup = ({ notifications }:
    { notifications: Notifd.Notification[] }) => {
    const [visible, setVisible] = createState(false)

    const Heading = () => <Gtk.Box
      cssClasses={["toolbar"]}>
      <Gtk.ToggleButton
        onClicked={() =>
          setVisible(!visible.get())}
        active={visible}
        cssClasses={["flat"]}>
        <Gtk.Box>
          <Gtk.Image
            iconName={notifications[0].appIcon} />
          <Gtk.Label
            label={notifications[0].appName}
            hexpand />
          <Gtk.Image
            iconName={visible.as(v =>
              v ? "go-up-symbolic" : "go-down-symbolic")} />
        </Gtk.Box>
      </Gtk.ToggleButton>
      <Gtk.Button
        iconName={"edit-clear-all-symbolic"}
        valign={Gtk.Align.END}
        onClicked={() =>
          notifications.forEach(n => n.dismiss())}
      />
    </Gtk.Box>

    return <Gtk.Box
      spacing={4}
      orientation={Gtk.Orientation.VERTICAL}>
      <Heading />
      <Notification
        notif={notifications[0]}
        closeAction={n => n.dismiss()}
      />
      <Gtk.Revealer revealChild={visible}>
        <Gtk.Box
          spacing={4}
          orientation={Gtk.Orientation.VERTICAL}>
          {notifications.slice(1).map(notif =>
            <Notification
              notif={notif}
              closeAction={n => n.dismiss()} />
          )}
        </Gtk.Box>
      </Gtk.Revealer>
    </Gtk.Box>
  }

  return <Gtk.Box
    orientation={Gtk.Orientation.VERTICAL}
    cssClasses={["notif-list"]}
    spacing={4}>
    <Header />
    <Gtk.Box
      orientation={Gtk.Orientation.VERTICAL}
      spacing={6}>
      <For each={createBinding(notifd, "notifications").as(n => n
        .sort((a, b) => b.time - a.time)
        .reduce((res, notif) => {
          const i = res.findIndex(n =>
            n[0].appName === notif.appName)
          if (i === -1)
            res.push([notif]);
          else
            res[i].push(notif);
          return res;
        }, [] as Notifd.Notification[][]))}>
        {(n: Notifd.Notification[]) =>
          n.length === 1 ?
            <Notification
              closeAction={n => n.dismiss()}
              notif={n[0]} />
            :
            <NotificationGroup notifications={n} />
        }
      </For>
      <Adw.StatusPage
        visible={createBinding(notifd, "notifications")
          .as(n => n.length < 1)}
        vexpand
        cssClasses={["compact"]}
        title={"No new Notifications"}
        description={"You're up-to-date"}
        iconName={"user-offline-symbolic"} />
    </Gtk.Box>
  </Gtk.Box >
}