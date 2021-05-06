import { Request, Response, NextFunction, Router } from 'express';
import PostService from "../service/post.service";
import multerUpload from "../middleware/multerUpload.middleware";

declare global {
    namespace Express {
        interface Request {
            user: {
                userId: string,
                email: string
            } //or other type you would like to use,
            sessionID: string,
            login: any
        }
    }
}

class PostRouter {
    // /api/post
    public path = "/post"
    public router = Router()
    private _postService = new PostService();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, multerUpload.array("filesToUpload[]"), this.createPost);
        this.router.post(`${this.path}/delete`, this.deletePost);
        this.router.post(`${this.path}/like`, this.toggleLikePost)
    }

    private createPost = async (req: Request, res: Response) => {
        console.log("-- create post -- ");
        
        console.log(req.user);  
        const userId = req.user.userId;
        try {
            const result = await this._postService.createPost(userId, req);
            console.log(result);
            res.status(200).send({ message: "success" });
        } catch(error) {
            res.status(400).send({ message: error });
        }
    }

    private deletePost = async (req: Request, res: Response, next: NextFunction) => {
        console.log("--- Delete Post ---")
        try {
            const userId = req.user.userId;
            const postId = req.body.postId;
            console.log("delete post router: postId ", postId);
            await this._postService.deletePost(userId, postId);
            res.status(200).send({ message: "success" })
        } catch(error) {
            console.log("error", error)
            res.status(error.status).send({ message: error.message });
        }
    }

    private toggleLikePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            const postId = req.body.postId;
            const result = await PostService.toggleLikePost(userId, postId);
            res.status(result.status).send({ message: result.message });
        } catch(error) {
            console.log("router: ", error);
            res.status(error.status).send({ message: error.message });
        }
    }
}

export default PostRouter;