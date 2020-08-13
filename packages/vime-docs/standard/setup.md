# Setup

[![version-badge]][package]
[![size-badge]][size]
[![license-badge]][license]
[![github-badge]][github]
[![tweet-badge]][tweet]

The Standard Player is used to interact with a provider/embed through the [core Vime player interface](./api/player.md).
If you'd like to know what features it includes and how it compares to other options then see 
the [getting started](../getting-started.md) page.

{% hint style="info" %}
[Vime 2](https://github.com/vime-js/vime) is now out which is a complete rewrite 
towards [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). Vime 1
will not be receiving any more updates, so we **strongly recommended** you start with or migrate
over to Vime 2 today.
{% endhint %}

[package]: https://www.npmjs.com/package/@vime-js/standard
[version-badge]: https://img.shields.io/npm/v/@vime-js/standard?style=flat-square
[size]: https://bundlephobia.com/result?p=@vime-js/standard
[size-badge]: https://img.shields.io/bundlephobia/minzip/@vime-js/standard?label=min%2Bgzip&style=flat-square
[license]: https://github.com/vime-js/vime/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/vime-js/vime?color=blue&style=flat-square
[tweet]: https://twitter.com/intent/tweet?text=Check%20out%20Vime%20%28https%3A%2F%2Fgithub.com%2Fvime-js%2Fvime%29%2C%20it%20makes%20embedding%20and%20using%20media%20players%20for%20the%20web%20simple.%20It%20supports%20Html5%2C%20YouTube%2C%20Dailymotion%2C%20Vimeo%20and%20more%20to%20come%21
[tweet-badge]: https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fvime-js%2Fvime
[github]: https://github.com/vime-js/vime
[github-badge]: https://img.shields.io/github/stars/vime-js/vime?style=social

## Installation

{% tabs %}
{% tab title="NPM" %}
```
npm install @vime-js/standard
```
{% endtab %}

{% tab title="YARN" %}
```
yarn add @vime-js/standard
```
{% endtab %}

{% tab title="UNPKG" %}
```html
<script src="https://unpkg.com/@vime-js/standard"></script>
```
{% endtab %}

{% tab title="JSDELIVR" %}
```html
<script src="https://cdn.jsdelivr.net/npm/@vime-js/standard"></script>
```
{% endtab %}
{% endtabs %}

The `dist` folder inside the package contains multiple exports:

- `standard.js` is a UMD development build that can be used directly in the browser via the `<script>` tag.
- `standard.esm.js` is intended for use with modern bundlers like [Webpack][webpack] or [Rollup][rollup].
- `standard.min.js` is a UMD production build that can be used directly in the browser via the `<script>` tag.
- `standard.esm.min.js` is an ESM production build that can be used directly in modern browsers via the `<script type="module">` tag.

{% hint style="info" %}
* UMD builds are exported under the `Vime` namespace.
* If you're using a bundler then it will automatically pull in the correct files.
* If you're using [svelte-loader][svelte-loader] or [rollup-plugin-svelte][svelte-rollup] then you'll receive the uncompiled components.
{% endhint %}

[webpack]: https://webpack.js.org
[rollup]: http://rollupjs.org/guide/en
[svelte-loader]: https://github.com/sveltejs/svelte-loader
[svelte-rollup]: https://github.com/sveltejs/rollup-plugin-svelte

## Setup

{% tabs %}
{% tab title="JavaScript" %}
```js
// All providers are named {ProviderName}Provider.
import { Player, FileProvider, YouTubeProvider } from '@vime-js/standard';

const target = document.getElementById('player-target');

// Mount
const player = new Player({
  target,
  // If you'd like to initialize any props on setup, you can do so here.
  props: {
    src: '/media/my-video.mp4',
    providers: [FileProvider, YouTubeProvider]
  }
});

// ...

// Destroy
player.$destroy();
```

{% hint style="info" %}
See the [client-side component API][svelte-client-api] for the complete set of component initialization options.
{% endhint %}
{% endtab %}

[svelte-client-api]: https://svelte.dev/docs#Client-side_component_API

{% tab title="Svelte" %}
```html
<Player
  src="/media/my-video.mp4"
  {providers}
  bind:this={player} 
/>

<script>
  import { onMount } from 'svelte';
  // All providers are named {ProviderName}Provider.
  import { Player, FileProvider, YouTubeProvider } from '@vime-js/standard';

  let player;

  const providers = [FileProvider, YouTubeProvider];

  onMount(() => {
    /**
     * If you need to call any methods, you have access 
     * to the player instance here.
     **/
  });
</script>
```
{% endtab %}
{% endtabs %}

## Where to next?

See the [provider notes](./notes.md) page for any provider specific issues or features, and then go to 
the [API](./api/player.md) section to find out how to interact with the player.

{% hint style="info" %}
- For all available providers see this [page](../../vime-standard/src/providers/index.js).
- See the [loading media](../guides/loading-media.md) guide to see how you can set the `src` prop.
{% endhint %}