import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PostModel from "../model/post.model";
import ImageModel from "../model/image.model";

class PostService {
    public async createPost(userId, req) {
        console.log("req.files", req.files);
        try {
            const postData = req.body;
            // const result = await new ImageModel(req.files[0].originalname, req.files[0].buffer).upload();
            const result = await Promise.all([new ImageModel(req.files[0].originalname, req.files[0].buffer).upload(), new ImageModel(req.files[1].originalname, req.files[1].buffer).upload()]);
            
            console.log("images", result);

            // const postContent = new PostModel(userId, postData);
            // console.log(postContent);
            // await postContent.createPost();
            
            return {
                status: "success"
            }
        } catch(error) {
            return {
                status: "error",
                error: `${error}`
            }
        }
    }

    public async deletePost(userId, postId) {
        try {
            const result = PostModel.delete(userId, postId);
            return result;
        } catch(err) {
            throw new Error(err);
        }
    }
}

export default PostService;