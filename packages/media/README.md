# @vime/media

Vime is simply a collection of [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 
that help you easily build and customize your our own media player. This package contains media files 
that are used for testing and demonstration purposes throughout Vime's source code, examples and 
public content.

The audio and video files are extracted from [Agent 327: Operation Barbershop][agent-327-blender], 
which is an [animated feature film][agent-327-youtube] based on Dutch artist 
[Martin Lodewijk's][martin-wiki] classic comics series [Agent 327][agent-327-wiki]. 

This short film was produced by [Blender.org][blender-org]️ ❤️ and is licensed under 
[CC-BY-ND][cc-by-nd-license]. They are an amazing organization who continuously gives back to their 
community and shares their work, please consider [supporting them][blender-sub].

[agent-327-wiki]: https://en.wikipedia.org/wiki/Agent_327
[agent-327-blender]: https://cloud.blender.org/p/agent-327
[agent-327-youtube]: https://www.youtube.com/watch?v=mN0zPOpADL4&t=1s
[blender-org]: https://www.blender.org
[blender-sub]: https://store.blender.org/product/membership
[cc-by-nd-license]: https://creativecommons.org/licenses/by-nd/2.0
[martin-wiki]: https://en.wikipedia.org/wiki/Martin_Lodewijk

## Usage

**⚠️ package install size is ~440 MB.**

Install `@vime/media` and [`sirv-cli`](https://github.com/lukeed/sirv) to serve it:

```bash
$: npm install sirv-cli @vime/media -D
```

Create a script in `package.json` to serve the media:

```json
{
  "scripts": {
    "serve": "npm run serve:media & npm run serve:app",
    "serve:media": "sirv node_modules/@vime/media --cors --port 3335 --quiet",
    "serve:app": "echo \"Serving app.\""
  }
}
```

Load the required media file from `http://localhost:3335` (eg: `http://localhost:3335/720p.mp4`).

- `/audio.mp3`
- `/{240p,360p,480p,720p,1080p}.mp4`
- `/blank.mp4`
- `/poster.png`
- `/poster-2.png`
- `/hls/index.m3u8`
- `/mpd/manifest.mpd`
- `/subs/{english,french,german,italian,russian,spanish}.vtt`

### Example

```html
<video poster="http://localhost:3335/poster.png">
  <source src="http://localhost:3335/720p.mp4" type="video/mp4">
  <track default kind="subtitles" src="http://localhost:3335/subs/english.vtt" srclang="en" label="English" >
  <track kind="subtitles" src="http://localhost:3335/subs/spanish.vtt" srclang="es" label="Spanish" >
</video>
```

## Related

- [GitHub](https://github.com/vime-js/vime)
- [Discord](https://discord.gg/PaFFSk)
- [Documentation](https://vimejs.com)