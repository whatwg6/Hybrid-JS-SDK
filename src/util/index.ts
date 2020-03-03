import uuid from "uuid/v4";

function generateId(): string {
  return uuid();
}

function isFunction(target: any): target is Function {
  return typeof target === "function";
}

export { generateId, isFunction };
