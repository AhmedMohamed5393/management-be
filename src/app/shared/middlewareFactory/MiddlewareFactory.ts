import { IMiddleware } from "./IMiddleware";
export class MiddlewareFactory {
    private middlewareMap: Map<string, IMiddleware>;
    constructor() {
        this.middlewareMap = new Map<string, IMiddleware>();
        this.createMiddlewares();
    }
    public getMiddleware(middlewareName: string) { return this.middlewareMap.get(middlewareName); }
    private createMiddlewares() {}
}
export default MiddlewareFactory;
