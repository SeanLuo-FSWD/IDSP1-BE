import database from "../util/database.util";

class CommentModel {
    private _db = database;
    private _commentCollection = this._db.collection("comment");
    private _timeStamp: string;
    public text: string;
    private _commentId: string;
    private _userId: string;
    private _postId: string;
    static commentCollection = database.collection("comment");

    constructor(userId, input) {
        this._timeStamp = new Date().toString();
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
                timeStamp: this._timeStamp
            }
            const result = await this._commentCollection.doc(commentId).set(newComment);
            console.log(result);
            return {
                status: 200,
                message: "success"
            }

        } catch(err) {
            throw {
                status: 500,
                message: "Error when inserting comment into database."
            }
        }
    }

    async getAllCommentsByPostId(postId) {
        
    }
}

export default CommentModel;