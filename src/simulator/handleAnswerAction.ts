import { StatusLevel } from "../core/Status";

function handleAnswerAction(eventId: string, action: string): void {
  switch (action) {
    case "writeAnswer": {
      setTimeout(() =>
        global.webApp.callBack({
          id: eventId,
          payload: {
            status: StatusLevel.Failure,
            params: "bad event"
          }
        })
      );
    }
  }
}

export default handleAnswerAction;
