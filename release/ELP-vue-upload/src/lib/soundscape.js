import { Howl } from 'howler'

const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA='

const cues = {
  breeze: new Howl({ src: [SILENT_WAV], volume: 1 }),
  chime: new Howl({ src: [SILENT_WAV], volume: 1 }),
  success: new Howl({ src: [SILENT_WAV], volume: 1 })
}

export function playCue(name) {
  const cue = cues[name]
  if (!cue) return

  try {
    cue.stop()
    cue.play()
  } catch {
    // Audio is optional for the prototype.
  }
}
