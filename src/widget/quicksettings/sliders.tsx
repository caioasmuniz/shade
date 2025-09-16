import Wireplumber from "gi://AstalWp"
import { createBinding } from "gnim"
import Brightness from "#/lib/brightness"
import { AudioEndpointControl } from "../common/audioControl"
import { Slider } from "../common/slider"

const audio = Wireplumber.get_default()!.audio

export const AudioConfig = () => (
  <AudioEndpointControl
    defaultDevice={audio.defaultSpeaker}
    devices={createBinding(audio, 'speakers')}
  />
)

export const MicConfig = () => (
  <AudioEndpointControl
    defaultDevice={audio.defaultMicrophone}
    devices={createBinding(audio, "microphones")}
  />
)

export const BrightnessSlider = () => {
  const brightness = Brightness.get_default();

  return <Slider
    icon={"display-brightness-symbolic"}
    min={0}
    max={100}
    value={createBinding(brightness, "screen")
      .as((v) => v * 100)}
    setValue={(value) => (
      brightness.set({ screen: value / 100 }))}
  />
}
