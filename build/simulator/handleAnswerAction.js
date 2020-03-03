"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleAnswerAction(eventId, action) {
    switch (action) {
        case "writeAnswer": {
            setTimeout(function () {
                return global.webApp.callBack({
                    id: eventId,
                    payload: {
                        status: "Failure",
                        params: "bad event"
                    }
                });
            });
        }
    }
}
exports.default = handleAnswerAction;
