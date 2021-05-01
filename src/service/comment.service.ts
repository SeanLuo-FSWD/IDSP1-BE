import CommentModel from "../model/comment.model";

class CommentService {
    public async createComment(userId: string, comment) {
        try {
            const newComment = new CommentModel(userId, comment);

            const result = await newComment.create();
            if (result.status === 200) {
                return result;
            } else {
                throw new Error();
            }
        } catch(err) {
            return err
        }
    }
}

export default CommentService;