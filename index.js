import { path } from '@vuepress/utils'


import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MUSIC_SOURCE_MODES = ['remote', 'local'];

function resolveMusicSourceMode(mode) {
  if (!mode) {
    return 'local';
  }
  return MUSIC_SOURCE_MODES.includes(mode) ? mode : 'local';
}

export default (options = {}) => {
  const mode = resolveMusicSourceMode(options.mode);
  const musicList = options.musicList ?? options.musicsList ?? [];

  if (options.mode && options.mode !== mode) {
    console.warn(`unknown music source mode "${options.mode}", fallback to "local"`);
  }
  if (mode === 'local' && (!Array.isArray(musicList) || musicList.length === 0)) {
    console.warn('local mode requires a non-empty musicList in vuepress config');
  }
  if (mode === 'remote' && !options.musicPlayerProps?.remoteMusicList) {
    console.warn('remote mode requires musicPlayerProps.remoteMusicList');
  }
  if (!options.musicPlayerProps) {
    console.warn('music player properties is undefined');
  }

  return {
    name: "vp-very-simple-music-plugin",

    extendsMarkdown: () => {
    },

    clientConfigFile: path.resolve(__dirname, "./client.js"),
    define: () => {
      return {
        "VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MODE": JSON.stringify(mode),
        "VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_LIST": JSON.stringify(musicList),
        "VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_PLAYER_PROPS": JSON.stringify(options.musicPlayerProps || {})
      };
    },
  };
};
