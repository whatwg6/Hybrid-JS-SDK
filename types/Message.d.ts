type Id = string;

type Message = {
  readonly id: Id;
  payload: {
    module: string;
    action: string;
    params?: any;
  };
};

type HybridMessage = {
  readonly id: Id;
  module: string;
  action: string;
  params?: any;
};

export { Message, HybridMessage };
