import { Request, Response, NextFunction, Router } from "express";
import PostService from "../service/post.service";
import multerUpload from "../middleware/multerUpload.middleware";
import PostModel from "../model/post.model";

declare global {
  namespace Express {
    interface Request {
      sessionID: string;
      login: any;
    }
  }
}

class PostRouter {
  // /api/post
  public path = "/post";
  public router = Router();
  private _postService = new PostService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `/create`,
      multerUpload.array("filesToUpload[]"),
      this.createPost
    );
    this.router.post(`/`, this.getFeed);

    this.router.post(`/delete`, this.deletePost);
    this.router.get("/like/:postId", this.getLikesByPostId);
    this.router.post(`/like`, this.toggleLikePost);
    this.router.get("/:postId", this.getFullPostByPostId);
  }

  private getFeed = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`--- ${req.user.userId} get entire feed ---`);
    console.log(req.body);
    const filter = req.body;

    try {
      const result = await this._postService.getFeed(filter, req);
      console.log(result);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  private createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(`--- ${req.user.userId} creating post ---`);
    try {
      const result = await this._postService.createPost(req);
      console.log(result);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  private deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("--- Delete Post ---");
    try {
      console.log("req.body");
      console.log(req.body);

      const userId = req.user.userId;
      const postId = req.body.postId;
      console.log("delete post router: postId ", postId);
      await this._postService.deletePost(userId, postId);
      res.status(200).send({ message: "success" });
    } catch (error) {
      console.log("delete post router", error);
      next(error);
    }
  };

  private toggleLikePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("toggle like post router");
    try {
      const user = req.user;
      const postId = req.body.postId;
      const result = await PostService.toggleLikePost(user, postId);
      res.status(200).send({ message: result });
    } catch (error) {
      next(error);
    }
  };

  private getFullPostByPostId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId = req.params.postId;
      const result = await PostService.getFullPostByPostId(postId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  private getLikesByPostId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId = req.params.postId;
      const result = await PostService.getLikesByPostId(postId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}

export default PostRouter;
