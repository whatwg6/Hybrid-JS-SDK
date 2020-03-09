import Adapter from "./Adaper";
import type { CallbackPayload } from "./Message";
import type Event from "./Event";
declare class Bridge {
    private readonly adapter;
    constructor(adapter: Adapter);
    dispatch(event: Event, params?: any): Promise<CallbackPayload>;
    private onDispatch;
    listen(event: Event, handler: Function): Function;
    private unListen;
}
export default Bridge;
