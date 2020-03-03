"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleBaseAction(eventId, action) {
    switch (action) {
        case "openURL": {
            setTimeout(function () {
                return global.webApp.callBack({
                    id: eventId,
                    payload: {
                        status: "Success",
                        params: "open success"
                    }
                });
            });
        }
    }
}
exports.default = handleBaseAction;
