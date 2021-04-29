import { Request, Response, NextFunction, Router } from 'express';
import PostService from "../service/post.service";

class PostRouter {
    // /api/post
    public path = "/post"
    public router = Router()
    private _postService = new PostService();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.createPost);
        this.router.post(`${this.path}/delete`, this.deletePost);
    }

    private createPost = async (req: Request, res: Response) => {
        console.log("-- create post -- ");
        
        console.log(req.user);  
        const userId = req.user.userId;
        try {
            const result = await this._postService.createPost(userId, req.body);
            console.log(result);
            res.status(200).send({ message: "success" });
        } catch(error) {
            res.status(400).send({ message: error });
        }
    }

    
    // private getPostFeed = async (req: Request, res: Response) => {
    //     try {
    //         const result = await this._postService.getPostFeed(req.body)
            
    //         if (result.status === "success") {
    //             res.status(200).send(result);
    //         } else {
    //             throw new Error(result.error);
    //         }
    //     } catch(error) {
    //         res.status(400).send({
    //             status: "error",
    //             error: `${error}`
    //         })
    //     }
    // }

    private deletePost = async (req: Request, res: Response, next: NextFunction) => {
        console.log("--- Delete Post ---")
        try {
            const userId = req.user.userId;
            const postId = req.body.postId;
            await this._postService.deletePost(userId, postId);
            res.status(200).send({ message: "success" })
        } catch(error) {
            console.log("error", error)
            res.status(400).send({
                status: "error",
                error: error
            })
        }
    }
}

export default PostRouter;