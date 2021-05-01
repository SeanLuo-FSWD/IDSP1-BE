import { Request, Response, NextFunction, Router } from "express";
import CommentService from "../service/comment.service";

class CommentRouter {
    public path = "/user";
    public router = Router();
    private _commentService = new CommentService();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signUp`, this.createComment);
    }

    private async createComment(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.userId;
            const commentBody = req.body;
            console.log("--- create comment ---");
            const result = await this._commentService.createComment(userId, commentBody);
            
        } catch(err) {
            res.status(400).send({
                message: err
            })
        }
    }
}

export default CommentRouter;