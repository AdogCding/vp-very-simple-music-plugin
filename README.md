# vp-very-simple-music-plugin

## install plugin for your vuepress project
```bash
npm install vp-very-simple-music-plugin
```
## configure the playlist source in `config.js`

`mode` chooses where the playlist comes from:

- `local`: use the `musicList` array from this VuePress config (default)
- `remote`: request `musicPlayerProps.remoteMusicList`

Remote:

```javascript
export default defineUserConfig({
  plugins:[
    verySimpleMusicPlugin({
      mode: 'remote',
      musicPlayerProps: {
        title: "音乐播放器",
        remoteMusicList: 'https://cf-blog-worker.adog.workers.dev/case/music',
        isOn: true
      }
    })
  ]
})
```

Local:

```javascript
export default defineUserConfig({
  plugins:[
    verySimpleMusicPlugin({
      mode: 'local',
      musicList: [
        {
          title: "我记得你眼里的依恋",
          artist: "Artist A",
          src: "https://pub-61e582de589c4524a18c1a65269384e8.r2.dev/I_remember_your_looking.mp3",
          lyricUrl: "https://example.com/song-a.lrc",
          cover: "https://pub-61e582de589c4524a18c1a65269384e8.r2.dev/cat-sleeping.jpg"
        },
        {
          title: "情义两心坚",
          artist: "Artist A",
          src: "https://pub-61e582de589c4524a18c1a65269384e8.r2.dev/1888.%E6%83%85%E4%B9%89%E4%B8%A4%E5%BF%83%E5%9D%9A%20-%20%E5%BC%A0%E5%BE%B7%E5%85%B0%20-%2080%E5%9B%9E%E5%BF%86%E5%BD%95.mp3",
          lyricUrl: "https://example.com/song-a.lrc",
          cover: "https://pub-61e582de589c4524a18c1a65269384e8.r2.dev/cat-hide-on-bed.jpg"
        },
        {
          title: "萨特的磨坊",
          artist: "Artist A",
          src: "https://pub-61e582de589c4524a18c1a65269384e8.r2.dev/223.%E8%90%A8%E7%89%B9%E7%A3%A8%E5%9D%8ADan%2BFogelberg(223.Sutt_%E7%88%B1%E7%BB%99%E7%BD%91_aigei_com%20(2).mp3",
          lyricUrl: "https://example.com/song-a.lrc",
          cover: "https://pub-61e582de589c4524a18c1a65269384e8.r2.dev/cat-sleep.jpg"
        }
      ],
      musicPlayerProps: {
        title: "音乐播放器",
        isOn: true
      }
    })
  ]
})
```
