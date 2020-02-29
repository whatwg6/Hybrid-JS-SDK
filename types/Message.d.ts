type Id = string;

type Message = {
  id: Id;
  payload: {
    module: string;
    action: string;
    params: any;
  };
};

type HybridMessage = {
  id: Id;
  module: string;
  action: string;
  params: any;
};

export { Message, HybridMessage };
