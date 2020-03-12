import Adapter from "./Adaper";
declare class Bridge {
    private readonly adapter;
    constructor(adapter: Adapter);
    dispatch<T>(event: string, params?: T): Promise<unknown>;
    private onDispatch;
    listen(event: string, handler: Function): () => void;
    private unListen;
}
export default Bridge;
