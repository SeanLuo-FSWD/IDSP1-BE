import CommentModel from "../model/comment.model";

class CommentService {
    public async createComment(userId: string, comment) {
        try {
            const newComment = new CommentModel(userId, comment);

            const result = await newComment.create();
            if (result.status === 200) {
                return result;
            } else {
                throw {
                    status: 500,
                    message: "Failed to insert comment into database."
                }
            }
        } catch(err) {
            return err
        }
    }

    public async getCommentsByPostId(postId) {
        try {
            const result = await CommentModel.getAllCommentsByPostId(postId);

            return {
                status: result.status,
                comments: result.comments
            }
        } catch(err) {
            throw {
                status: 500,
                message: "SERVICE: Failed to get all comments by post id."
            }
        }
    }
}

export default CommentService;