import { Id, Action, StatusLevel } from "../core/Message";

function handleAnswerAction(eventId: Id, action: Action): void {
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
