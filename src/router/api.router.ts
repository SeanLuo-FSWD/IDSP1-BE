import { Request, Response, NextFunction, Router } from 'express';
//routes
import UserRouter from './user.router';
import PostRouter from './post.router';

import database from '../util/database.util'

class APIRouter {
    public router = Router();
    public path = "/api";
    private subRouters = [
        new UserRouter(),
        new PostRouter()
    ];
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