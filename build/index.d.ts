import simulator from "./simulator";
declare const hybrid: {
    dispatch: (action: string, args?: any) => Promise<any>;
    listen: (action: string, args: Function) => Function;
};
export { simulator };
export default hybrid;
