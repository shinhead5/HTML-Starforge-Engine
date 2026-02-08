# Audio

The audio system wraps WebAudio with a master bus plus `music` and `sfx` buses.

```ts
const music = new Music(engine.assets.getAudio("music"), engine.audio);
music.play(true);

const shoot = new Sound(engine.assets.getAudio("shoot"), engine.audio, "sfx");
shoot.play();
```

## Mixing

Adjust volumes per bus:

```ts
engine.audio.setMasterVolume(0.8);
engine.audio.fade("music", 0.2, 1.5);
```

## Fades and Ducking

You can implement music ducking by fading the music bus while sfx plays:

```ts
engine.audio.fade("music", 0.4, 0.2);
```

Then return it to full volume after a short timer.

## Autoplay Policies

Most browsers require a user interaction before audio can start. If you need to unlock audio, wait for the first input event and then play a silent buffer to resume the audio context.

## Layered Music

For more dynamic soundtracks, you can run multiple `Music` instances routed through different buses and fade between them based on game state.

## Spatial Audio

The current audio utilities are 2D and center-panned. For spatial audio, use a `PannerNode` and connect it to a bus.

## Volume Normalization

If your audio assets have inconsistent loudness, normalize them in a DAW before shipping. This keeps mix levels consistent and reduces the need for runtime adjustments.
