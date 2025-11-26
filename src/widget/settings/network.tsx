import Adw from "gi://Adw?version=1";
import AstalNetwork from "gi://AstalNetwork?version=0.1";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding, createComputed, createState, For } from "gnim";

export default () => {
  const network = AstalNetwork.get_default()
  const primary = createComputed([
    createBinding(network, "wifi"),
    createBinding(network, "wired"),
    createBinding(network, "primary")
  ], (wifi, wired, primary) =>
    primary === AstalNetwork.Primary.WIRED ?
      wired : wifi)
  const [password, setPassword] = createState("")

  const ApWidget = (ap: AstalNetwork.AccessPoint) =>
    <Adw.ExpanderRow
      iconName={ap.iconName}
      title={ap.ssid}>
      <Gtk.PasswordEntry onNotifyText={self =>
        setPassword(self.text)} />
      <Adw.ButtonRow
        title={"Connect"}
        visible = {ap.requiresPassword}
        onActivated={() =>
          ap.activate(password.get())}
      />
    </Adw.ExpanderRow>

  return <Adw.PreferencesPage name={"network"}>
    <Adw.PreferencesGroup
      title={"Connected Network"}>
      <Adw.ExpanderRow
        iconName={primary.as(p => p.iconName)}
        title={primary.as(p =>
          p instanceof AstalNetwork.Wifi ?
            (p as AstalNetwork.Wifi).ssid :
            (p as AstalNetwork.Wired).device.interface
        )}>
        <Adw.ButtonRow
          title={"Connect"} />
      </Adw.ExpanderRow>
    </Adw.PreferencesGroup>
    <Adw.PreferencesGroup
      title={"Available Networks"}>
      <Gtk.Button
        $type={"header-suffix"}
        iconName={"view-refresh-symbolic"}
        onClicked={() => network.wifi.scan()} />
      <For each={createBinding(network.wifi, "accessPoints")
        .as(aps => aps.sort((a, b) => b.strength - a.strength))
      }>
        {ApWidget}
      </For>
    </Adw.PreferencesGroup>
  </Adw.PreferencesPage>
}