# Youtube How Old - Source Code Guide

## How it works?

Youtube How Old uses a [Google Chrome `contentScript`](https://developer.chrome.com/extensions/content_scripts)
 to run a Javascript (`src/main.js`) script.

The `contentScript` get the metadata for the published date from the `document`.

```html
<meta itemprop="datePublished" content="2016-09-18">
```

Parses it and then modifies the DOM.

From:
```html
<div id="watch-uploader-info">
  <strong class="watch-time-text">
    Published on Mar 25, 2017
  </strong>
</div>
```

To:
```html
<div id="watch-uploader-info">
  <strong class="watch-time-text">
    Published on Mar 25, 2017 (23 days ago)
  </strong>
</div>
```

Due to the fact that [Youtube](https://www.youtube.com/) uses [SPFJS](https://github.com/youtube/spfjs)
 for page navigation we need to inject the `contentScript` in every page run it once
 and then hook it up with the `spfdone` event.
