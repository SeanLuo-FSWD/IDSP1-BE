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
        this.router.post(`${this.path}`, this.createComment);
        this.router.get(`${this.path}`, this.getCommentByPostId);
    }

    private createComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            const commentBody = req.body;
            console.log("--- create comment ---");
            const result = await this._commentService.createComment(userId, commentBody);
            console.log("result", result);
            res.status(result.status).send({...result.comment});
        } catch(err) {
            console.log(err);
            res.status(400).send({
                message: err
            })
        }
    }

    private getCommentByPostId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.query.postId;
            const result = await this._commentService.getCommentsByPostId(postId);
           
            res.status(200).send({ comments: result.comments });
        } catch(err) {
            res.status(400).send({
                message: err.message
            })
        }
    }
}

export default CommentRouter;