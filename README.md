# Hybrid JS-SDK

## Examples

### Install

```bash
nvm use 14

yarn
yarn build

cd examples

yarn
yarn start
```

### Xcode build

- xcode open examples folder and build with simulator

## Core

### Web -> Native

Native inject global function into browser:

- nativeBridge.sendMessage

### Native -> Web

Web define two methods to window:

- window.webApp.callback
- window.webApp.dispatch

## API

### Web -> Native

[examples/src/index.js](./examples/src/index.js)

- Web dispatch `event` to native

```js
hybrid.dispatch(event, params).then(console.log);
```

- Web handle native dispatch `event`

```js
const unsubscribe1 = hybrid.listen(event, callback);
const unsubscribe2 = hybrid.listen(event, callback);
```

- unsubscribe `event`

```
unsubscribe1()
```

### Native -> Web

[examples/src/index.js](./examples/src/index.js)

- Native dispatch `event` to web

```js
webApp.dispatch(event, params);
```

- Native handle web dispatch `event`

```js
setTimeout(() => {
  webApp.callBack(eventId, params);
});
```
