import CommentModel from "../model/comment.model";
import PostModel from "../model/post.model";

class CommentService {
    public async createComment(user, comment) {
        const newComment = new CommentModel(user, comment);
        const post = await PostModel.getPostByPostId(comment.postId);
        if (!post) throw {
            status: 404,
            message: "Post not found."
        }

        const result = await newComment.create();
        return result;
    }

    public async getCommentsByPostId(postId) {
        const result = await CommentModel.getAllCommentsByPostId(postId);

        return result;
    }
}

export default CommentService;