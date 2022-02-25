[![Build Status](https://travis-ci.com/internetarchive/iaux-book-downloads.svg?branch=master)](https://travis-ci.com/internetarchive/iaux-book-downloads)
[![codecov](https://codecov.io/gh/internetarchive/iaux-book-downloads/branch/master/graph/badge.svg)](https://codecov.io/gh/internetarchive/iaux-book-downloads)

# Deprecated.  See [@internetarchive/bookreader](https://github.com/internetarchive/bookreader)

# \<ia-book-downloads>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i ia-book-downloads
```
or
```bash
yarn add @internetarchive/ia-book-downloads
```

## Usage
```html
<script type="module">
  import 'ia-book-downloads/ia-book-downloads.js';
</script>

<ia-book-downloads></ia-book-downloads>
```

Supply the element with an optional array of download options to immediately
render. Each result can have these properties:

```js
{
  type: 'Encrypted Adobe PDF', // Button text
  url: '#', // The URL to the downloadable item
  note: 'PDF files contain high quality images of pages.', // Optional note to render below the button
}
```

## Styling

```css
ia-book-downloads {
  --downloadButtonColor: #fff;
  --downloadButtonBg: #547fba;
  --externalButtonColor: #547fba;
  --externalButtonBg: #fff;
}
```

## Linting with ESLint
To scan the project for linting errors, run
```bash
npm run lint
```

## Testing with Karma
To run the suite of karma tests, run
```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
