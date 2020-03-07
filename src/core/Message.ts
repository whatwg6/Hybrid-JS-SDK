export const enum StatusLevel {
  Success = "Success",
  Failure = "Failure"
}

export type StatusString = keyof typeof StatusLevel;

type Id = string;

type Module = string;
type Action = string;

interface CallbackPayload {
  status: StatusString;
  params?: any;
}

interface DispatchPayload {
  module: Module;
  action: Action;
  params?: any;
}

type DispatchMessage = {
  readonly id: Id;
  payload: DispatchPayload;
};

type CallbackMessage = {
  readonly id: Id;
  payload: CallbackPayload;
};

type Message = DispatchMessage | CallbackMessage;

export {
  Id,
  Module,
  Action,
  DispatchMessage,
  CallbackMessage,
  CallbackPayload,
  DispatchPayload
};
export default Message;
