/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../build/core/Adaper.js":
/*!*******************************!*\
  !*** ../build/core/Adaper.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar NativeInterface_1 = __importDefault(__webpack_require__(/*! ./NativeInterface */ \"../build/core/NativeInterface.js\"));\nvar util_1 = __webpack_require__(/*! ../util */ \"../build/util/index.js\");\nvar Adapter = (function () {\n    function Adapter(eventEmitter) {\n        this.eventEmitter = eventEmitter;\n    }\n    Adapter.prototype.postMessage = function (_a) {\n        var id = _a.id, _b = _a.payload, action = _b.action, module = _b.module, params = _b.params;\n        var hybridMessage = {\n            id: id,\n            module: module,\n            action: action,\n            params: params\n        };\n        if (global.webkit &&\n            global.webkit.messageHandlers &&\n            global.webkit.messageHandlers.nativeApp &&\n            util_1.isFunction(global.webkit.messageHandlers.nativeApp.postMessage)) {\n            global.webkit.messageHandlers.nativeApp.postMessage(hybridMessage);\n        }\n        else if (global.nativeApp &&\n            util_1.isFunction(global.nativeApp.sendToNative)) {\n            global.nativeApp.sendToNative(JSON.stringify(hybridMessage));\n        }\n    };\n    Adapter.prototype.connect = function () {\n        global.webApp = new NativeInterface_1.default(this.eventEmitter);\n    };\n    Adapter.prototype.disconnect = function () {\n    };\n    return Adapter;\n}());\nexports.default = Adapter;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../examples/node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///../build/core/Adaper.js?");

/***/ }),

/***/ "../build/core/Bridge.js":
/*!*******************************!*\
  !*** ../build/core/Bridge.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar util_1 = __webpack_require__(/*! ../util */ \"../build/util/index.js\");\nvar Bridge = (function () {\n    function Bridge(adapter) {\n        this.adapter = adapter;\n        this.adapter.connect();\n    }\n    Bridge.prototype.dispatch = function (event, params) {\n        var id = util_1.generateId();\n        var _a = event.split(\"/\"), module = _a[0], action = _a[1];\n        this.adapter.postMessage({\n            id: id,\n            payload: {\n                action: action,\n                module: module,\n                params: params\n            }\n        });\n        return this.onDispatch(id);\n    };\n    Bridge.prototype.onDispatch = function (id) {\n        var _this = this;\n        return new Promise(function (resolve, reject) {\n            return _this.adapter.eventEmitter.on(id, function (messages) {\n                var message = messages[id];\n                if (message) {\n                    resolve(message.payload.params);\n                }\n                reject({ messages: messages, id: id });\n            });\n        });\n    };\n    Bridge.prototype.listen = function (event, handler) {\n        var _this = this;\n        var wrapHandler = function (args) { return handler(args); };\n        this.adapter.eventEmitter.on(event, wrapHandler);\n        return function () { return _this.unListen(event, wrapHandler); };\n    };\n    Bridge.prototype.unListen = function (event, handler) {\n        this.adapter.eventEmitter.remove(event, handler);\n    };\n    return Bridge;\n}());\nexports.default = Bridge;\n\n\n//# sourceURL=webpack:///../build/core/Bridge.js?");

/***/ }),

/***/ "../build/core/EventEmit.js":
/*!**********************************!*\
  !*** ../build/core/EventEmit.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar EventEmit = (function () {\n    function EventEmit() {\n        this.listener = {};\n    }\n    EventEmit.prototype.on = function (eventName, handler) {\n        this.listener[eventName] = this.listener[eventName] || [];\n        this.listener[eventName].push(handler);\n    };\n    EventEmit.prototype.emit = function (eventName, params) {\n        if (this.listener[eventName]) {\n            this.listener[eventName].forEach(function (f) { return f(params); });\n        }\n    };\n    EventEmit.prototype.remove = function (eventName, handler) {\n        if (this.listener[eventName]) {\n            this.listener[eventName] = this.listener[eventName].filter(function (f) { return f !== handler; });\n        }\n    };\n    return EventEmit;\n}());\nexports.default = EventEmit;\n\n\n//# sourceURL=webpack:///../build/core/EventEmit.js?");

/***/ }),

/***/ "../build/core/NativeInterface.js":
/*!****************************************!*\
  !*** ../build/core/NativeInterface.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar NativeInterface = (function () {\n    function NativeInterface(eventEmitter) {\n        this.eventEmitter = eventEmitter;\n    }\n    NativeInterface.prototype.dispatch = function (event, params) {\n        this.eventEmitter.emit(event, params);\n    };\n    NativeInterface.prototype.callBack = function (id, params) {\n        var _a;\n        this.eventEmitter.emit(id, (_a = {},\n            _a[id] = {\n                payload: {\n                    params: params\n                }\n            },\n            _a));\n    };\n    return NativeInterface;\n}());\nexports.default = NativeInterface;\n\n\n//# sourceURL=webpack:///../build/core/NativeInterface.js?");

/***/ }),

/***/ "../build/index.js":
/*!*************************!*\
  !*** ../build/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Adaper_1 = __importDefault(__webpack_require__(/*! ./core/Adaper */ \"../build/core/Adaper.js\"));\nvar Bridge_1 = __importDefault(__webpack_require__(/*! ./core/Bridge */ \"../build/core/Bridge.js\"));\nvar EventEmit_1 = __importDefault(__webpack_require__(/*! ./core/EventEmit */ \"../build/core/EventEmit.js\"));\nvar simulator_1 = __importDefault(__webpack_require__(/*! ./simulator */ \"../build/simulator/index.js\"));\nexports.simulator = simulator_1.default;\nvar eventEmit = new EventEmit_1.default();\nvar adaper = new Adaper_1.default(eventEmit);\nvar bridge = new Bridge_1.default(adaper);\nvar dispatch = function (action, args) {\n    return bridge.dispatch(action, args);\n};\nvar listen = function (action, args) {\n    return bridge.listen(action, args);\n};\nvar hybrid = {\n    dispatch: dispatch,\n    listen: listen\n};\nexports.default = hybrid;\n\n\n//# sourceURL=webpack:///../build/index.js?");

/***/ }),

/***/ "../build/simulator/index.js":
/*!***********************************!*\
  !*** ../build/simulator/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction simulator() {\n    global.webkit = global.webkit || {};\n    global.webkit.messageHandlers = global.webkit.messageHandlers || {};\n    global.webkit.messageHandlers.nativeApp =\n        global.webkit.messageHandlers.nativeApp || {};\n    global.webkit.messageHandlers.nativeApp.postMessage = function (_a) {\n        var id = _a.id, module = _a.module, action = _a.action, params = _a.params;\n        if (module === \"base\" && action === \"openURL\") {\n            setTimeout(function () {\n                return global.webApp.callBack(id, __assign({ status: \"base/openURL success\", module: module,\n                    action: action }, params));\n            });\n        }\n    };\n    setTimeout(function () {\n        return global.webApp.dispatch(\"base/themeChange\", { theme: \"light\" });\n    });\n}\nexports.default = simulator;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../examples/node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///../build/simulator/index.js?");

/***/ }),

/***/ "../build/util/index.js":
/*!******************************!*\
  !*** ../build/util/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar v4_1 = __importDefault(__webpack_require__(/*! uuid/v4 */ \"../node_modules/uuid/v4.js\"));\nfunction generateId() {\n    return v4_1.default();\n}\nexports.generateId = generateId;\nfunction isFunction(target) {\n    return typeof target === \"function\";\n}\nexports.isFunction = isFunction;\n\n\n//# sourceURL=webpack:///../build/util/index.js?");

/***/ }),

/***/ "../node_modules/uuid/lib/bytesToUuid.js":
/*!***********************************************!*\
  !*** ../node_modules/uuid/lib/bytesToUuid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return ([bth[buf[i++]], bth[buf[i++]], \n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]]]).join('');\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack:///../node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "../node_modules/uuid/lib/rng-browser.js":
/*!***********************************************!*\
  !*** ../node_modules/uuid/lib/rng-browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Unique ID creation requires a high quality random # generator.  In the\n// browser this is a little complicated due to unknown quality of Math.random()\n// and inconsistent support for the `crypto` API.  We do the best we can via\n// feature-detection\n\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto\n// implementation. Also, find the complete implementation of crypto on IE11.\nvar getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||\n                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));\n\nif (getRandomValues) {\n  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto\n  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef\n\n  module.exports = function whatwgRNG() {\n    getRandomValues(rnds8);\n    return rnds8;\n  };\n} else {\n  // Math.random()-based (RNG)\n  //\n  // If all else fails, use Math.random().  It's fast, but is of unspecified\n  // quality.\n  var rnds = new Array(16);\n\n  module.exports = function mathRNG() {\n    for (var i = 0, r; i < 16; i++) {\n      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;\n      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;\n    }\n\n    return rnds;\n  };\n}\n\n\n//# sourceURL=webpack:///../node_modules/uuid/lib/rng-browser.js?");

/***/ }),

/***/ "../node_modules/uuid/v4.js":
/*!**********************************!*\
  !*** ../node_modules/uuid/v4.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"../node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"../node_modules/uuid/lib/bytesToUuid.js\");\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof(options) == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n  options = options || {};\n\n  var rnds = options.random || (options.rng || rng)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || bytesToUuid(rnds);\n}\n\nmodule.exports = v4;\n\n\n//# sourceURL=webpack:///../node_modules/uuid/v4.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _build_simulator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../build/simulator */ \"../build/simulator/index.js\");\n/* harmony import */ var _build_simulator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_build_simulator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _build__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../build */ \"../build/index.js\");\n/* harmony import */ var _build__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_build__WEBPACK_IMPORTED_MODULE_1__);\n// native inject js into webview\n\n\n_build_simulator__WEBPACK_IMPORTED_MODULE_0___default()();\n\n// webviwe import hybrid js sdk\n\n\n// web -> native\n_build__WEBPACK_IMPORTED_MODULE_1___default.a\n  .dispatch(\"base/openURL\", { url: \"www.goggle.com\" })\n  .then(console.log)\n  .catch(console.error);\n\n_build__WEBPACK_IMPORTED_MODULE_1___default.a\n  .dispatch(\"base/openURL\", { url: \"www.twitter.com\" })\n  .then(console.log)\n  .catch(console.error);\n\n// web -> native -> web\nconst unsubscribe1 = _build__WEBPACK_IMPORTED_MODULE_1___default.a.listen(\"base/themeChange\", console.log);\nconst unsubscribe2 = _build__WEBPACK_IMPORTED_MODULE_1___default.a.listen(\"base/themeChange\", console.log);\n\nunsubscribe2();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });