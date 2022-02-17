/**
 * A lightweight vimeo embed. Still should feel the same to the user, just MUCH faster to initialize and paint.
 *
 * Thx to these as the inspiration
 *   https://github.com/paulirish/lite-youtube-embed
 */
class LiteVimeoEmbed extends HTMLElement {
	connectedCallback() {
		this.videoId = this.getAttribute('videoid');

		let playBtnEl = this.querySelector('.ltv-playbtn');
		// A label for the button takes priority over a [playlabel] attribute on the custom-element
		this.playLabel = (playBtnEl && playBtnEl.textContent.trim()) || this.getAttribute('playlabel') || 'Play';

		/**
		 * Lo, the vimeo placeholder image!  (aka the thumbnail, poster image, etc)
		 *
		 * See https://github.com/paulirish/lite-youtube-embed/blob/master/youtube-thumbnail-urls.md
		 *
		 * TODO: Do the sddefault->hqdefault fallback
		 *       - When doing this, apply referrerpolicy (https://github.com/ampproject/amphtml/pull/3940)
		 * TODO: Consider using webp if supported, falling back to jpg
		 */
		if (!this.style.backgroundImage) {
			this.style.backgroundImage = `url("https://vumbnail.com/${this.videoId}.jpg")`;
		}

		// Set up play button, and its visually hidden label
		if (!playBtnEl) {
			playBtnEl = document.createElement('button');
			playBtnEl.type = 'button';
			playBtnEl.classList.add('ltv-playbtn');
			this.append(playBtnEl);
		}
		if (!playBtnEl.textContent) {
			const playBtnLabelEl = document.createElement('span');
			playBtnLabelEl.className = 'ltv-visually-hidden';
			playBtnLabelEl.textContent = this.playLabel;
			playBtnEl.append(playBtnLabelEl);
		}

		// On hover (or tap), warm up the TCP connections we're (likely) about to use.
		this.addEventListener('pointerover', LiteVimeoEmbed.warmConnections, { once: true });

		// Once the user clicks, add the real iframe and drop our play button
		// TODO: In the future we could be like amp-youtube and silently swap in the iframe during idle time
		//   We'd want to only do this for in-viewport or near-viewport ones: https://github.com/ampproject/amphtml/pull/5003
		this.addEventListener('click', this.addIframe);
	}

	// // TODO: Support the the user changing the [videoid] attribute
	// attributeChangedCallback() {
	// }

	/**
	 * Add a <link rel={preload | preconnect} ...> to the head
	 */
	static addPrefetch(kind, url, as) {
		const linkEl = document.createElement('link');
		linkEl.rel = kind;
		linkEl.href = url;
		if (as) {
			linkEl.as = as;
		}
		document.head.append(linkEl);
	}

	/**
	 * Begin pre-connecting to warm up the iframe load
	 * Since the embed's network requests load within its iframe,
	 *   preload/prefetch'ing them outside the iframe will only cause double-downloads.
	 * So, the best we can do is warm up a few connections to origins that are in the critical path.
	 *
	 * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http://crbug.com/593267
	 * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
	 */
	static warmConnections() {
		if (LiteVimeoEmbed.preconnected) return;

		LiteVimeoEmbed.addPrefetch('preconnect', 'https://player.vimeo.com');
		LiteVimeoEmbed.addPrefetch('preconnect', 'https://i.vimeocdn.com');
		LiteVimeoEmbed.addPrefetch('preconnect', 'https://f.vimeocdn.com');
		LiteVimeoEmbed.addPrefetch('preconnect', 'https://fresnel.vimeocdn.com');

		LiteVimeoEmbed.preconnected = true;
	}

	addIframe(e) {
		if (this.classList.contains('ltv-activated')) return;
		e.preventDefault();
		//this.classList.add('ltv-activated');

		const params = new URLSearchParams(this.getAttribute('params') || []);
		params.append('autoplay', '1');

		const iframeEl = document.createElement('iframe');
		iframeEl.width = 560;
		iframeEl.height = 315;
		// No encoding necessary as [title] is safe. https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#:~:text=Safe%20HTML%20Attributes%20include
		iframeEl.title = this.playLabel;
		iframeEl.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
		iframeEl.allowFullscreen = true;
		// AFAIK, the encoding here isn't necessary for XSS, but we'll do it only because this is a URL
		// https://stackoverflow.com/q/64959723/89484
		iframeEl.src = `https://player.vimeo.com/video/${encodeURIComponent(this.videoId)}?${params.toString()}`;

		let target = this;
		if (this.getAttribute('target')) {
			target = document.querySelector(this.getAttribute('target'));
		} else {
			this.classList.add('ltv-activated');
		}
		target.append(iframeEl);

		// Set focus for a11y
		iframeEl.focus();
	}
}
// Register custom element
customElements.define('lite-vimeo', LiteVimeoEmbed);
