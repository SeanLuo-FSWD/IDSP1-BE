import { getDB, client } from "../util/database.util";
import { ObjectId } from "mongodb";

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
        const session = client.startSession();
        
        session.startTransaction();
        const newComment = {
            text: this._text,
            userId: this._userId,
            postId: this._postId,
            createdAt: this._createdAt
        }
        console.log("creating new comment");
        await this._db.collection("post").updateOne(
            { id: new ObjectId(this._postId) },
            { $inc: { commentsCount: 1 } }
        );
        const result = await this._db.collection("comment").insertOne(newComment);
        session.commitTransaction();
        
        return {
            commentId: result.insertedId,
            ...newComment
        }
    }

    static async getAllCommentsByPostId(postId) {
        const database = getDB();
        const comments = await database.collection("comment").find({ postId }).toArray();

        console.log(comments);
        return comments;
 
    }
}

export default CommentModel;