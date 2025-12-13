# vp-very-simple-music-plugin

## install plugin for your vuepress project
```bash
npm install vp-very-simple-music-plugin
```
##  define your music source url at your config.js

```javascript
export default defineUserConfig({
  plugins:[
    verySimpleMusicPlugin({
      musicPlayerProps: {
        title: "音乐播放器",
        remoteMusicList: 'https://cf-blog-worker.adog.workers.dev/case/music',
        isOn: true
      }
    })
  ]
})
```
