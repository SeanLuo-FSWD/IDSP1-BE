import { Request, Response, NextFunction, Router } from 'express';
//routes
import UserRouter from './user.router';
import PostRouter from './post.router';
import CommentRouter from "../router/comment.router";

import { checkAuth } from '../middleware/authentication.middleware';

import initNodemailer from '../util/nodemailer.util';

class APIRouter {
    public router = Router();
    public path = "/api";
    private subRouters = [
        new UserRouter()
    ];
    private authedSubRouters = [
        new PostRouter(),
        new CommentRouter()
    ]
    constructor() {
        this.initRouters();
    }

    private initRouters() {
        this.subRouters.forEach(subRoute => {
            this.router.use(`${this.path}`, subRoute.router);
        })
        this.router.get(`${this.path}/emailTest`, async (req, res) => {
            console.log('email verify');
        })
        this.authedSubRouters.forEach(subRoute => {
            this.router.use(`${this.path}`, checkAuth, subRoute.router);
        })
        // this.router.get(`${this.path}/authTest`, checkAuth, (req, res) => {
        //     console.log("passed auth");
        //     console.log(req.user);
        // })
    }
}

export default APIRouter;