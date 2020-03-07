import Adapter from "./Adaper";
import { CallbackPayload } from "./Message";
import Event from "./Event";
declare class Bridge {
    private readonly adapter;
    constructor(adapter: Adapter);
    dispatch(event: Event, params?: any): Promise<CallbackPayload>;
    private onDispatch;
    listen(event: Event, handler: Function): Function;
    private unListen;
}
export default Bridge;
