import database from "../util/database.util";

class CommentModel {
    private _db = database;
    private _commentCollection = this._db.collection("comment");
    private _createdAt: string;
    public text: string;
    private _commentId: string;
    private _userId: string;
    private _postId: string;
    private static _commentCollection = database.collection("comment");

    constructor(userId, input) {
        this._createdAt = new Date().toString();
        this.text = input.text;
        this._userId = userId;
        this._postId = input.postId;
    }

    async create() {
        try {
            const commentId = this._commentCollection.doc().id;
            const newComment = {
                commentId,
                text: this.text,
                userId: this._userId,
                postId: this._postId,
                createdAt: this._createdAt
            }
            const result = await this._commentCollection.doc(commentId).set(newComment);
            console.log(result);
            return {
                status: 200,
                comment: newComment
            }

        } catch(err) {
            throw {
                status: 500,
                message: "Error when inserting comment into database."
            }
        }
    }

    static async getAllCommentsByPostId(postId) {
        try {
            let comments = [];
            const result = await this._commentCollection.where("postId", "==", postId).get();
            if (!result.empty) {
                result.forEach(doc => comments.push(doc.data()));
            }
            console.log(comments);
            return {
                status: 200,
                comments
            }
        } catch(err) {
            console.log("--- Error: getAllCommentsByPostId ---", err);
            throw {
                status: 500,
                message: "MODEL: Failed to query the comments by post id."
            }
        }
    }
}

export default CommentModel;