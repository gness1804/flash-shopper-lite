# Flash Shopper Lite

Version: 1.0.1

This is a lite version of my Flash Shopper app built in Svelte. [Check it out live!](https://svelte-app.grahamnessler.now.sh/)

## Building

This app was built using the Svelte starter template. See below for details:

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template-webpack.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template-webpack svelte-app
cd svelte-app
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start webpack:

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and the page should reload with your changes.

## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
now
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public
```

## Testing:

This project uses [Cypress](https://cypress.io) for end-to-end testing. To run the tests, you can either use the GUI:

```bash
npm run e2e:open
```

Or run the tests using the CLI:

```bash
npm run e2e
```
