import { getDB, client } from "../util/database.util";
import { ObjectId } from "mongodb";
import CommentModel from "./comment.model";


class PostModel {
    private _userId: string;
    private _createdAt: string;
    private _text: string;
    private _images: string[];
    private _likesCount: number;
    private _commentsCount: number;
    private _db = getDB();
    
    constructor(userId: string, input) {
        this._userId = userId;
        this._createdAt = new Date().toString();
        this._text = input.text;
        this._images = input.images;//[] for no images,  
        this._likesCount = 0;
        this._commentsCount = 0;
    }

    public async create() {
        const newPost = {
            userId: this._userId,
            createdAt: this._createdAt,
            text: this._text,
            images: this._images,
            likesCount: this._likesCount,
            commentsCount: this._commentsCount
        }

        const result = await this._db.collection("post").insertOne(newPost);

        //Figure out what to return here
        return {
            postId: result.insertedId,
            ...newPost
        };
    }

    static async delete(userId, postId) {
        const database = getDB();
 
        const deleteResult = await database.collection("post").deleteOne({ 
            _id: new ObjectId(postId), 
            userId: userId
        });
        return Boolean(deleteResult.deletedCount);
    }

    static async togglePostLike(userId: string, postId: string) {
        const database = getDB();
        const session = client.startSession();
        session.startTransaction();
        const isLiked = await database.collection("like").findOne({ postId, userId });
        if (isLiked) {
            await database.collection("like").deleteOne({ postId, userId });
            await database.collection("post").updateOne({ _id: new ObjectId(postId) }, { $inc: { likesCount: -1 } });
        } else {
            await database.collection("like").insertOne({ postId, userId });
            await database.collection("post").updateOne({ _id: new ObjectId(postId) }, { $inc: { likesCount: 1 } });
        }
        await session.commitTransaction();
        return isLiked? "unliked" : "liked";
    }

    static getPostByPostId = async (postId: string) => {
        const database = getDB();
        const post = await database.collection("post").findOne({ _id: new ObjectId(postId) });
        return post;
    }

    static getFullPostByPostId = async (postId: string) => {
        console.log("get full post model", postId);
        const database = getDB();
        const post = await database.collection("post").aggregate([
            { 
                $addFields: { "postId": { "$toString": "$_id" } }
            },
            {
                $lookup: {
                    from: "comment",
                    localField: "postId",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "like",
                    localField: "postId",
                    foreignField: "postId",
                    as: "likes"
                }
            },
        ]).toArray();

        console.log("aggregate", post);
        // const post = await database.collection("post").findOne({ _id: new ObjectId(postId) });
        // const comments = await CommentModel.getAllCommentsByPostId(postId);
        // const likes = await database.collection("like").find({ postId: postId }).toArray();
        // console.log(post);
        // if (post) {
        //     post.comments = comments? comments : [];
        //     post.likes = likes? likes : [];
        // }
        return post;
    }
}

export default PostModel;