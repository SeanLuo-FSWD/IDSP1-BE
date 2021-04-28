import { Request, Response, NextFunction, Router } from 'express';
import AuthService from "../service/authentication.service";

class PostRouter {
    public path = "/post"
    public router = Router()
    private _authService = new AuthService();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/post`, this.createPost);
        this.router.post(`${this.path}/login`, this.login);
    }

    private createPost = async (req: Request, res: Response) => {
        try {
            const result = await this._authService.createPost(req.body)
            
            if (result.status === "success") {
                res.status(200).send(result);
            } else {
                throw new Error(result.error);
            }
        } catch(error) {
            res.status(400).send({
                status: "error",
                error: `${error}`
            })
        }
    }

    private getPostFeed = async (req: Request, res: Response) => {
        try {
            const result = await this._authService.getPostFeed(req.body)
            
            if (result.status === "success") {
                res.status(200).send(result);
            } else {
                throw new Error(result.error);
            }
        } catch(error) {
            res.status(400).send({
                status: "error",
                error: `${error}`
            })
        }
    }

    private deletePost = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Delete Post")
        try {
            
            this.router.delete('/post/:postId', (req, res) => {
                const userId = post.userId;
                const posts = getPostFeed(req.body.userId);
                const result = await this._authService.login(email, password);
                if (userId === posts.userId) {
                    return res.status(200).send(result);
                } else {
                    throw new Error(result.error);
                }
            })

        } catch(error) {
            console.log("error", error)
            res.status(400).send({
                status: "error",
                error: `${error}`
            })
        }
    }
}

export default PostRouter;