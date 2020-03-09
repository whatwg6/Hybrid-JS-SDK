import type { Id, Action } from "../core/Message";
import { StatusLevel } from "../core/Message";

function handleBaseAction(eventId: Id, action: Action): void {
  switch (action) {
    case "openURL": {
      // open webpage with special browser
      setTimeout(() =>
        global.webApp.callBack({
          id: eventId,
          payload: {
            status: StatusLevel.Success,
            params: "open success"
          }
        })
      );
    }
  }
}

export default handleBaseAction;
