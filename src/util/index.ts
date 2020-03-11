import uuid from "uuid/v4";

import { Id } from "../core/Message";

function generateId(): Id {
  return uuid();
}

export { generateId };
