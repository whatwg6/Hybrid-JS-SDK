import Adapter from "./Adaper";
import { CallbackPayload } from "../../types/Message";
import Event from "../../types/Event";
declare class Bridge {
    private readonly adapter;
    constructor(adapter: Adapter);
    dispatch(event: Event, params?: any): Promise<CallbackPayload>;
    private onDispatch;
    listen(event: Event, handler: Function): Function;
    private unListen;
}
export default Bridge;
