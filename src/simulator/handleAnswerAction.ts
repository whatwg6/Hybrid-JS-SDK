import { StatusLevel } from "../core/Status";

function handleAnswerAction(
  eventId: string,
  action: string
) {
  switch (action) {
    case "writeAnswer": {
      setTimeout(() =>
        global.webApp
          .callBack({
            id: eventId,
            payload: {
              status: StatusLevel.Failure,
              params: "bad event"
            }
          })
          .then(console.log)
      );
    }
  }
}

export default handleAnswerAction;
