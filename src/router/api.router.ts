import { Request, Response, NextFunction, Router } from 'express';
//routes
import UserRouter from './user.router'



class APIRouter {
    public router = Router();
    public path = "/api";
    private subRouters = [new UserRouter()];
    constructor() {
        this.initRouters();
    }

    private initRouters() {
        this.subRouters.forEach(subRoute => {
            this.router.use(`${this.path}`, subRoute.router);
        })
    }
}

export default APIRouter;