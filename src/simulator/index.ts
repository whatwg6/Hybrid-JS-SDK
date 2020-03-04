// simulate Native injcet js
import { DispatchMessage } from "../../types/Message";

import handleBaseAction from "./handleBaseAction";
import handleAnswerAction from "./handleAnswerAction";
import handleCallBack from "./handleCallBack";

function simulator(): void {
  global.webkit = global.webkit || {};
  global.webkit.messageHandlers = global.webkit.messageHandlers || {};
  global.webkit.messageHandlers.nativeApp =
    global.webkit.messageHandlers.nativeApp || {};

  global.webkit.messageHandlers.nativeApp.postMessage = function({
    id,
    payload: { module, action, params }
  }: DispatchMessage) {
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
