import Adapter from "./Adaper";
import type Event from "./Event";
declare class Bridge {
    private readonly adapter;
    constructor(adapter: Adapter);
    dispatch<T>(event: Event, params?: T): Promise<unknown>;
    private onDispatch;
    listen(event: Event, handler: Function): Function;
    private unListen;
}
export default Bridge;
