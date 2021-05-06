import { getDB } from "../util/database.util";

class CommentModel {
    private _db = getDB();
    private static _db = getDB();
    private _createdAt: string;
    private _text: string;
    private _commentId: string;
    private _userId: string;
    private _postId: string;

    constructor(userId, input) {
        this._createdAt = new Date().toString();
        this._text = input.text;
        this._userId = userId;
        this._postId = input.postId;
    }

    async create() {
        try {
            const newComment = {
                text: this._text,
                userId: this._userId,
                postId: this._postId,
                createdAt: this._createdAt
            }
            const result = await this._db.collection("comment").insertOne(newComment);
            console.log(result);
            return {
                status: 200,
                comment: {
                    commentId: result.insertedId,
                    ...newComment
                }
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
            const database = getDB();
            const comments = await database.collection("comment").find({ postId }).toArray();

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