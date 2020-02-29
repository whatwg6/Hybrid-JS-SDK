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

- Web subscribe `module/action`

```js
const unsubscribe = hybrid.listen(event, callback);
```

- Native publish `module/action`

```js
webApp.dispatch(event, params).then(console.log);
```

- unsubscribe `module/action`

```
unsubscribe()
```

## Preview

Vscode debug

- [examples/index.js](./examples/index.js)
- [examples/nativeSimulator.js](./examples/nativeSimulator.js)

## TODO

## Others

- PR thanks!
