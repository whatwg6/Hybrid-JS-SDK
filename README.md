# Hybrid JS-SDK

## Web call Native

Native inject global function into browser:

- iOS: window.webkit.messageHandlers.nativeApp.postMessage
- Android: window.nativeApp.sendToNative

## Native call Web

Web define two methods to window:

- window.webApp.callback
- window.webApp.dispatch

## Examples

### Web -> Native

[examples/src/index.js](./examples/src/index.js)

- Web dispatch `module/action`

```js
hybrid.dispatch(event, params).then(console.log);
```

- Native callBack `module/action`

```js
setTimeout(() => {
  webApp.callBack(eventId, params);
});
```

### Native -> Web

[examples/src/index.js](./examples/src/index.js)

- Web subscribe `module/action`

```js
const unsubscribe1 = hybrid.listen(event, callback);
const unsubscribe2 = hybrid.listen(event, callback);
```

- Native publish `module/action`

```js
webApp.dispatch(event, params).then(console.log);
```

- unsubscribe `module/action`

```
unsubscribe1()
```

## Preview

- [online examples](https://0x0006e.github.io/Hybrid-JS-SDK/examples/dist/)
- [other examples](https://github.com/0x0006e/Hybrid-JS-SDK/blob/master/examples/src/index.js)
- local preview

```bash
  git clone https://github.com/0x0006e/Hybrid-JS-SDK.git
  cd Hybrid-JS-SDK/examples
  yarn && yarn start
```

## TODO

- inject order
- tests

## Others

- PR thanks!
