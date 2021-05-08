import { Request, Response, NextFunction, Router } from "express";
import CommentService from "../service/comment.service";

class CommentRouter {
    public path = "/comment";
    public router = Router();
    private _commentService = new CommentService();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`/`, this.createComment);
        this.router.get(`/`, this.getCommentByPostId);
    }

    private createComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            const commentBody = req.body;
            console.log("--- create comment ---");
            const result = await this._commentService.createComment(userId, commentBody);
            console.log("result", result);
            res.status(200).send(result);
        } catch(error) {
            next(error);
        }
    }

    private getCommentByPostId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.query.postId;
            const result = await this._commentService.getCommentsByPostId(postId);
           
            res.status(200).send({ comments: result.comments });
        } catch(error) {
            next(error);
        }
    }
}

export default CommentRouter;