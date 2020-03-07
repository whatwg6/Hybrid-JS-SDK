import uuid from "uuid/v4";

import { Id } from "../core/Message";

function generateId(): Id {
  return uuid();
}

function isFunction(target: any): target is Function {
  return typeof target === "function";
}

export { generateId, isFunction };
