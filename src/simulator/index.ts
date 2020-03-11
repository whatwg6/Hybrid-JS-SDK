// simulate Native injcet js
import type { DispatchMessage } from "../core/Message";

import handleBaseAction from "./handleBaseAction";
import handleAnswerAction from "./handleAnswerAction";
import handleCallBack from "./handleCallBack";

function simulator() {
  global.webkit = global.webkit ?? {};
  global.webkit.messageHandlers = global.webkit.messageHandlers ?? {};
  global.webkit.messageHandlers.nativeApp =
    global.webkit.messageHandlers.nativeApp ?? {};

  global.webkit.messageHandlers.nativeApp.postMessage = function<T>({
    id,
    payload: { module, action, params }
  }: DispatchMessage<T>) {
    switch (module) {
      case "base": {
        handleBaseAction(id, action);
        break;
      }

      case "answer": {
        handleAnswerAction(id, action);
        break;
      }
    }
  };

  handleCallBack();
}

export default simulator;
