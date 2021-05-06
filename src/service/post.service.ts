import PostModel from "../model/post.model";
import ImageModel from "../model/image.model";

class PostService {
    public async createPost(userId, req) {
        console.log("req.files", req.files);
        try {
            const postData = req.body;
            
            let imagesUploadResult = [];
            if (req.files.length) {
                const imagesUploadArr = req.files.map(async file => await new ImageModel(file.originalname, file.buffer).upload());
                imagesUploadResult = await Promise.all(imagesUploadArr)
            }
            
            console.log("images", imagesUploadResult);

            postData.images = imagesUploadResult.length?
                imagesUploadResult.map((imageInfo: { status: string, imageUrl: string }) => imageInfo.imageUrl) :
                [];

            const postContent = new PostModel(userId, postData);
            console.log(postContent);
            await postContent.create();
            
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
            console.log("service", err);
            throw err;
        }
    }

    static async toggleLikePost(userId, postId) {
        try {
            const result = await PostModel.togglePostLike(userId, postId);
            console.log("---POST SERVICE: toggleLikePost result", result);
            return result;
        } catch(err) {

            throw {
                status: 400,
                message: "Failed to invoke model method."
            }
        }
    }
}

export default PostService;