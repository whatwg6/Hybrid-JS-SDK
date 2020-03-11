import uuid from "uuid/v4";

function generateId(): string {
  return uuid();
}

export { generateId };
