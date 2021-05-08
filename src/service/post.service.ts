import PostModel from "../model/post.model";
import ImageModel from "../model/image.model";

class PostService {
    public async createPost(userId, req) {
        const postData = req.body;
        
        let imagesUploadResult = [];
        if (req.files.length) {
            const imagesUploadArr = req.files.map(async file => await new ImageModel(file.originalname, file.buffer).upload());
            imagesUploadResult = await Promise.all(imagesUploadArr)
        }

        postData.images = imagesUploadResult.length?
            imagesUploadResult.map((imageInfo: { status: string, imageUrl: string }) => imageInfo.imageUrl) :
            [];

        const post = new PostModel(userId, postData);
        console.log(post);
        await post.create();
        
        return post;
    }

    public async deletePost(userId, postId) {
        const result = await PostModel.delete(userId, postId);
        console.log("delete service result", result);
        if (result) {
            return {
                status: 200,
                message: "success"
            }
        }
        console.log("delete post service error");
        throw {
            status: 404,
            message: "Post not found."
        }
    }

    static async toggleLikePost(userId, postId) {
        const result = await PostModel.togglePostLike(userId, postId);
        console.log("---POST SERVICE: toggleLikePost result", result);
        return result;
    }

    static async getFullPostByPostId(postId: string) {
        const result = PostModel.getFullPostByPostId(postId);
        return result;
    }
}

export default PostService;