import { StatusLevel } from "../core/Status";

function handleBaseAction(eventId: string, action: string): void {
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
