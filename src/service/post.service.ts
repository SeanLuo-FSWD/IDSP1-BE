import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PostModel from "../model/post.model";

class PostService {
    public async createPost(userId, postData) {
        try {
            const postContent = new PostModel(userId, postData);
            console.log(postContent);
            await postContent.createPost();
            
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
}

export default PostService;