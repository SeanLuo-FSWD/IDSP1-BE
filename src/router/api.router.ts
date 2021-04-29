import { Request, Response, NextFunction, Router } from 'express';
//routes
import UserRouter from './user.router'
import PostRouter from './post.router';

import { checkAuth } from '../middleware/authentication.middleware';

class APIRouter {
    public router = Router();
    public path = "/api";
    private subRouters = [
        new UserRouter()
    ];
    private authedSubRouters = [
        new PostRouter()
    ]
    constructor() {
        this.initRouters();
    }

    private initRouters() {
        this.subRouters.forEach(subRoute => {
            this.router.use(`${this.path}`, subRoute.router);
        })
        this.authedSubRouters.forEach(subRoute => {
            //need to enable checkAuth as middleware later
            this.router.use(`${this.path}`, subRoute.router);
        })
        this.router.get(`${this.path}/authTest`, checkAuth, (req, res) => {
            console.log("passed auth");
            console.log(req.user);
        })
    }
}

export default APIRouter;