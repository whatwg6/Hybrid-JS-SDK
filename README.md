# Hybrid JS-SDK

## Core

### Web -> Native

Native inject global function into browser:

- iOS: window.webkit.messageHandlers.nativeApp.postMessage
- Android: window.nativeApp.sendToNative

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
webApp.dispatch(event, params).then(console.log);
```

- Native handle web dispatch `event`

```js
setTimeout(() => {
  webApp.callBack(eventId, params);
});
```

## Preview

- [online examples](https://0x0006e.github.io/Hybrid-JS-SDK/examples/dist/)
- [other examples](https://github.com/0x0006e/react-SSR/blob/dev/hybrid/src/pages/home/index.tsx#L9)
- local preview

```bash
  git clone https://github.com/0x0006e/Hybrid-JS-SDK.git
  cd Hybrid-JS-SDK/examples
  yarn && yarn start
```

## TODO

- [ ] tests
- [x] workflow CI CD
- [ ] lint

## Others

- PR thanks!
