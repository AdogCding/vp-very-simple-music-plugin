export type MusicSourceMode = 'local' | 'remote'

export interface MusicTrack {
  title: string
  artist: string
  src: string
  lyricUrl?: string
  cover?: string
  duration?: number
}

export interface MusicPlayerProps {
  title?: string
  isOn?: boolean
  remoteMusicList?: string
}

export interface VerySimpleMusicPluginOptions {
  mode?: MusicSourceMode
  musicList?: MusicTrack[]
  musicsList?: MusicTrack[]
  musicPlayerProps?: MusicPlayerProps
}

export interface VerySimpleMusicPlugin {
  name: string
  extendsMarkdown: () => void
  clientConfigFile: string
  define: () => Record<string, string>
}

export default function verySimpleMusicPlugin(
  options?: VerySimpleMusicPluginOptions,
): VerySimpleMusicPlugin
