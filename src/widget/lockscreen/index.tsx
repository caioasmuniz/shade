import { monitors } from "#/lib/monitors"
import Adw from "gi://Adw?version=1"
import Astal from "gi://Astal?version=4.0"
import AstalAuth from "gi://AstalAuth?version=0.1"
import Gdk from "gi://Gdk?version=4.0"
import SessionLock from "gi://Gtk4SessionLock"
import GLib from "gi://GLib?version=2.0"
import Gtk from "gi://Gtk?version=4.0"
import { createRoot, createState, For, onCleanup, onMount } from "gnim"
import { app } from "#/App"
import { screenlocked, setScreelocked } from ".."

const createLocks = (onUnlock: () => void) => {
  const { LEFT, RIGHT, TOP, BOTTOM } = Astal.WindowAnchor
  const lock = SessionLock.Instance.new()
  const [time, setTime] = createState("")

  setInterval(() => {
    setTime(GLib.DateTime.new_now_local().format("%X")!)
  }, 1000);

  const unlock = (self: Gtk.PasswordEntry) => {
    AstalAuth.Pam.authenticate(self.get_text(), (_, res) => {
      try {
        AstalAuth.Pam.authenticate_finish(res)
        lock.unlock()
        app.lockscreen.forEach(w => w.destroy())
        setScreelocked(false)
        onUnlock()
      } catch (e) { console.log(e) }
    })
  }

  return <For each={monitors()}>
    {(monitor: Gdk.Monitor) =>
      <Astal.Window
        $={self => {
          app.lockscreen.push(self)
          onCleanup(() => {
            app.lockscreen = app.lockscreen.filter(l => l !== self)
          })
        }}
        onRealize={() => {
          for (const window of app.lockscreen) {
            if (!window.get_realized()) return
          }
          lock.lock()
          for (const window of app.lockscreen) {
            lock.assign_window_to_monitor(
              window, window.get_current_monitor()
            )
          }
        }}
        gdkmonitor={monitor}
        anchor={TOP | BOTTOM | LEFT | RIGHT}
        visible
        exclusivity={Astal.Exclusivity.IGNORE}
        keymode={Astal.Keymode.EXCLUSIVE}
      >
        <Gtk.Box
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
          spacing={16}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <Gtk.Label
            cssClasses={["title-1", "numeric", "card"]}
            label={time}
            css={"font-size: 5em;"}
          />
          <Gtk.Box
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.CENTER}
            spacing={4}
            orientation={Gtk.Orientation.VERTICAL}
            cssClasses={["card"]}>
            <Adw.Avatar size={64} />
            <Gtk.Label
              label={GLib.get_real_name()}
              cssClasses={["title-3"]} />
            <Gtk.PasswordEntry
              $={(self) => onMount(() => self.grab_focus())}
              placeholderText={"password"}
              showPeekIcon
              onActivate={unlock} />
          </Gtk.Box>
        </Gtk.Box>
      </Astal.Window>}
  </For>
}

export const LockScreen = () => {
  let locked = false

  onCleanup(
    screenlocked.subscribe(() => {
      if (screenlocked.get() && !locked) {
        locked = true
        createRoot((dispose) => {
          createLocks(() => {
            locked = false
            dispose()
          })
        })
      }
    })
  )
  return <></>
}