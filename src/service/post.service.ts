import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import postModel from "../model/post.model";

class PostService {


    public async createPost(postData) {
        try {
            const postContent = new postModel(postData);

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