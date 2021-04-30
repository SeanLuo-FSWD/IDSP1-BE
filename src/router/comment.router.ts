import { Request, Response, NextFunction, Router } from "express";
import AuthService from "../service/authentication.service";

class CommentRouter {
    public path = "/user";
    public router = Router();
    private _authService = new AuthService();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signUp`, this.createComment);
    }

    private createComment(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("--- create comment ---");
        } catch(err) {
            res.status(400).send({
                message: err
            })
        }
    }
}

export default CommentRouter;