import PostModel from "../model/post.model";
import ImageModel from "../model/image.model";
import LikeModel from "../model/like.model";

class PostService {
  public async getFeed(filter: any) {
    const result = await PostModel.getFeed(filter);
    return result;
  }

  public async createPost(req) {
    const user = req.user;
    const postData = req.body;

    let imagesUploadResult = [];
    console.log("777777777777777777777");
    console.log(req.files);
    console.log("88888888888888888888");
    console.log(req.body);

    if (req.files.length) {
      const imagesUploadArr = req.files.map(
        async (file) =>
          await new ImageModel(file.originalname, file.buffer).upload()
      );
      imagesUploadResult = await Promise.all(imagesUploadArr);
    }

    postData.images = imagesUploadResult.length
      ? imagesUploadResult.map((imageUrl: string) => imageUrl)
      : [];

    const post = new PostModel(user, postData);
    console.log(post);
    const result = await post.create();

    return result;
  }

  public async deletePost(userId, postId) {
    const result = await PostModel.delete(userId, postId);
    console.log("delete service result", result);
    if (result) {
      return {
        status: 200,
        message: "success",
      };
    }
    console.log("delete post service error");
    throw {
      status: 404,
      message: "Post not found.",
    };
  }

  static async toggleLikePost(user, postId) {
    const post = await PostModel.getPostByPostId(postId);
    if (!post)
      throw {
        status: 404,
        message: "Post not found.",
      };
    const result = await PostModel.togglePostLike(user, postId);
    console.log("---POST SERVICE: toggleLikePost result", result);
    return result;
  }

  static async getFullPostByPostId(postId: string) {
    const result = PostModel.getFullPostByPostId(postId);
    return result;
  }

  static async getLikesByPostId(postId: string) {
    const result = LikeModel.getLikesByPostId(postId);
    return result;
  }
}

export default PostService;
