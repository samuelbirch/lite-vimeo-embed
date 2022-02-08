# Lite Vimeo Embed

<!-- [![NPM lite-vimeo-embed package](https://img.shields.io/npm/v/lite-youtube-embed.svg)](https://npmjs.org/package/lite-youtube-embed) -->

> #### Renders faster than a sneeze.

Provide videos with a supercharged focus on visual performance. This custom element renders just like the real thing but approximately 224× faster.

<!-- Demo: https://paulirish.github.io/lite-youtube-embed/ -->

## Comparison

| Normal `<iframe>` Vimeo embed | `lite-vimeo` |
| --- | --- |
| ![Screen Shot 2019-11-03 at 5 23 50 PM](https://user-images.githubusercontent.com/39191/68095560-5c930d00-fe5f-11e9-8104-e73e77a21287.png) ![Screen Shot 2019-11-03 at 5 21 05 PM](https://user-images.githubusercontent.com/39191/68095562-5d2ba380-fe5f-11e9-8b5f-18f451b0716d.png) ![Screen Shot 2019-11-03 at 5 19 35 PM](https://user-images.githubusercontent.com/39191/68095565-5d2ba380-fe5f-11e9-835d-85d37df71f52.png) | ![Screen Shot 2019-11-03 at 5 23 27 PM](https://user-images.githubusercontent.com/39191/68095561-5d2ba380-fe5f-11e9-9393-e2206a64c8bf.png) ![Screen Shot 2019-11-03 at 5 20 55 PM](https://user-images.githubusercontent.com/39191/68095563-5d2ba380-fe5f-11e9-8f9a-f5c4a774cd56.png) ![Screen Shot 2019-11-03 at 5 20 16 PM](https://user-images.githubusercontent.com/39191/68095564-5d2ba380-fe5f-11e9-908f-7e12eab8b2ad.png) |

## Basic usage

<!-- Use the [`lite-vimeo-embed` npm package](https://www.npmjs.com/package/lite-vimeo-embed) or download from this repo and use `src/`. -->

To use the custom element you will need to:

1. Include the stylesheet within your application
1. Include the script as well
1. Use the `lite-vimeo` tag via HTML or JS.
1. Be happy that you're providing a better user experience to your visitors

```html
<!-- Include the CSS & JS.. (This could be direct from the package or bundled) -->
<link rel="stylesheet" href="node_modules/lite-vimeo-embed/src/lite-vimeo-embed.css" />

<script src="node_modules/lite-vimeo-embed/src/lite-vimeo-embed.js"></script>

<!-- Use the element. You may use it before the lite-vimeo-embed JS is executed. -->
<lite-vimeo videoid="76979871" playlabel="Play: Keynote (Google I/O '18)"></lite-vimeo>
```

<br>

### Custom Player Parameters

Vimeo supports a variety of [player parameters](https://developers.google.com/youtube/player_parameters#Parameters) to control the iframe's behavior and appearance. These may be applied by using the `params` attribute.

```html
<!-- Example to show a video player without controls, starting at 10s in, ending at 20s,
     with modest branding *and* enabling the JS API -->
<lite-vimeo videoid="76979871" params="controls=0&start=10&end=30&modestbranding=2&rel=0&enablejsapi=1"></lite-vimeo>
```

Note that lite-vimeo uses `autoplay=1` by default.

Demo: https://samuelbirch.github.io/lite-vimeo-embed/variants/params.html

## Pro-usage: load w/ JS deferred (aka progressive enhancement)

Use this as your HTML, load the script asynchronously, and let the JS progressively enhance it.

```html
<lite-vimeo videoid="76979871" style="background-image: url('https://i.ytimg.com/vi/ogfYd705cRs/hqdefault.jpg');">
	<a href="https://youtube.com/watch?v=ogfYd705cRs" class="ltv-playbtn" title="Play Video">
		<span class="ltv-visually-hidden">Play Video: Keynote (Google I/O '18)</span>
	</a>
</lite-vimeo>
```

Demo: https://samuelbirch.github.io/lite-vimeo-embed/variants/pe.html

## Custom poster image

If you want to provide a custom poster image, just set it as the background-image, and lite-vimeo will not overwrite it:

```html
<lite-vimeo videoid="76979871" style="background-image: url('https://i.ytimg.com/vi/ogfYd705cRs/hqdefault.jpg');"></lite-vimeo>
```

Demo: https://samuelbirch.github.io/lite-vimeo-embed/variants/custom-poster-image.html
