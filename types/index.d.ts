import simulator from "./simulator";
declare const hybrid: {
    dispatch: <T>(action: string, args?: T | undefined) => Promise<unknown>;
    listen: (action: string, callBack: Function) => () => void;
};
export { simulator };
export default hybrid;
