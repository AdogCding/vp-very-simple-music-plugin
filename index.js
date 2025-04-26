import { path } from '@vuepress/utils'


import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (options, app) => {
  return {
    name: "vp-very-simple-music-plugin",

    extendsMarkdown: () => {
    },

    clientConfigFile: path.resolve(__dirname, "./client.js"),
    define: () => {
      return {
        "VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_LIST": JSON.stringify(options["musicsList"]),
        "VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_PLAYER_PROPS": JSON.stringify(options["musicPlayerProps"])
      };
    },
  };
};
