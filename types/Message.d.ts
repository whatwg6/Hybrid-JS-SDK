type Id = string;

type Message = {
  id: Id;
  payload: {
    module: string;
    action: string;
    params: any;
  };
};

export default Message;
