export const enum StatusLevel {
  Success = "Success",
  Failure = "Failure"
}

export type StatusString = keyof typeof StatusLevel;

type Id = string;

type CallbackPayload = {
  status: StatusString;
  params?: any;
};

type DispatchPayload = {
  module: string;
  action: string;
  params?: any;
};

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
  DispatchMessage,
  CallbackMessage,
  CallbackPayload,
  DispatchPayload
};
export default Message;
