import { Request, Response, NextFunction, Router } from 'express';
//routes
import UserRouter from './user.router'

import database from '../util/database.util'

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
        this.router.post('/test', (req, res) => {
            const postId = database.collection('posts').doc().id;
            console.log(postId);

        })
    }
}

export default APIRouter;