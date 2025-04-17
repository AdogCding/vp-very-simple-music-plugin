import {path} from '@vuepress/utils'


import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (options, app) => {
  return {
    name: "vp-very-simple-music-plugin",

    extendsMarkdown: (md) => {
      // 添加自定义规则
      md.inline.ruler.before("emphasis", "audio_inline", (state, silent) => {
        const start = state.pos;
        const marker = "@audio(";

        if (state.src.startsWith(marker, start)) {
          const end = state.src.indexOf(")", start);
          if (end === -1) return false;

          const src = state.src.slice(start + marker.length, end);
          if (!src) return false;

          if (!silent) {
            const token = state.push("audio_inline", "audio", 0);
            token.content = src;
          }

          state.pos = end + 1;
          return true;
        }

        return false;
      });

      // 渲染器
      md.renderer.rules.audio_inline = (tokens, idx) => {
        const src = tokens[idx].content.trim();
        return `<audio src="${src}"></audio>`;
      };
    },

    clientConfigFile: path.resolve(__dirname,"./client.js"),
  };
};
