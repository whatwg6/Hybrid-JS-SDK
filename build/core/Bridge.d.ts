import Adapter from "./Adaper";
import { CallbackPayload } from "../../types/Message";
declare type UnListenFunction = Function;
declare class Bridge {
    private readonly adapter;
    constructor(adapter: Adapter);
    dispatch(event: string, params?: any): Promise<CallbackPayload>;
    private onDispatch;
    listen(event: string, handler: Function): UnListenFunction;
    private unListen;
}
export default Bridge;
