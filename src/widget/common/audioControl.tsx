import Wireplumber from "gi://AstalWp"
import Gtk from "gi://Gtk?version=4.0"
import { Accessor, createBinding, createState, For } from "gnim"
import { Slider } from "./slider"

interface AudioControlProps {
  defaultDevice: Wireplumber.Endpoint
  devices: Accessor<Wireplumber.Endpoint[]>
  visible?: Accessor<boolean> | boolean
}

export const AudioEndpointControl = ({ defaultDevice, devices, visible }: AudioControlProps) => {
  const [revealed, setRevealed] = createState(false)
  const radioGroup = new Gtk.CheckButton()

  const DeviceWidget = ({ device }:
    { device: Wireplumber.Endpoint }) =>
    <Gtk.Box
      spacing={4}
      orientation={Gtk.Orientation.VERTICAL}>
      <Gtk.Box spacing={4}>
        <Gtk.CheckButton
          group={radioGroup}
          cssClasses={["selection-mode"]}
          active={createBinding(device, "isDefault")}
          onNotifyActive={({ active }) => {
            device.isDefault = active
          }} />
        <Gtk.Label
          label={device.description}
          maxWidthChars={10}
          hexpand
          wrap
        />
      </Gtk.Box>
      <Slider
        min={0}
        max={100}
        icon={createBinding(device, "volumeIcon")}
        value={createBinding(device, 'volume')
          .as(v => v * 100)}
        setValue={value => device.set_volume(value / 100)}
      />
    </Gtk.Box>

  return (
    <Gtk.Box
      visible={visible}
      spacing={4}
      cssClasses={["audio-config"]}
      orientation={Gtk.Orientation.VERTICAL}>
      <Gtk.Box spacing={4}>
        <Slider
          icon={createBinding(defaultDevice, "volumeIcon")}
          min={0}
          max={100}
          value={createBinding(defaultDevice, 'volume')
            .as(v => v * 100)}
          setValue={value => defaultDevice.set_volume(value / 100)}
        />
        <Gtk.Button
          onClicked={() =>
            setRevealed(!revealed.get())}
          iconName={revealed.as(v =>
            v ? "go-up-symbolic" : "go-down-symbolic")}
        />
      </Gtk.Box>
      <Gtk.Revealer revealChild={revealed}>
        <Gtk.Box cssClasses={["card"]}
          orientation={Gtk.Orientation.VERTICAL}>
          <For each={devices}>
            {d => <DeviceWidget device={d} />}
          </For>
        </Gtk.Box>
      </Gtk.Revealer>
    </Gtk.Box>
  )
} 