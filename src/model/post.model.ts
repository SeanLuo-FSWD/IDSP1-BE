import { getDB } from "../util/database.util";
import { ObjectId } from "mongodb";

class PostModel {
    private _userId: string;
    private _createdAt: string;
    private _text: string;
    private _images: string[];
    private _likesCount: number;
    private _db = getDB();
    
    constructor(userId: string, input) {
        this._userId = userId;
        this._createdAt = new Date().toString();
        this._text = input.text;
        this._images = input.images;//[] for no images,  
        this._likesCount = 0;
    }

    public async create() {
        try {
            const newPost = {
                userId: this._userId,
                createdAt: this._createdAt,
                text: this._text,
                images: this._images,
                likesCount: this._likesCount
            }

            const result = await this._db.collection("post").insertOne(newPost);

            //Figure out what to return here
            return {
                status: 200,
                postId: result.insertedId,
                ...newPost
            };

        } catch(error) {
            throw {
                status: 500,
                message: "Failed to insert post to the database."
            }
        }
    }

    static async delete(userId, postId) {
        try {
            const database = getDB();
            const result = await database.collection("post").findOne({ _id: new ObjectId(postId) });
            console.log(result);
            if (!result) throw {
                status: 404,
                message: "Post not found."
            }
            console.log("post found");
            console.log(result.userId, userId);
            if (result.userId.toString() !== userId.toString()) throw {
                status: 403, 
                message: "Unauthorized."
            }
            console.log("ready to delete post");
            await database.collection("post").deleteOne({ _id: new ObjectId(postId) });
            return {
                status: 200,
                message: "success"
            }
        } catch(error) {
            console.log("post model delete post error", error);
            throw error;
        }
    }

    static async togglePostLike(userId, postId) {
        try {
            const database = getDB();
            const isLiked = await database.collection("like").findOne({ postId, userId });
            if (isLiked) {
                await database.collection("like").deleteOne({ postId, userId });
                await database.collection("post").updateOne({ _id: new ObjectId(postId) }, { $inc: { likesCount: -1 } });
                return {
                    status: 200,
                    message: "unliked"
                }   
            } else {
                await database.collection("like").insertOne({ postId, userId });
                await database.collection("post").updateOne({ _id: new ObjectId(postId) }, { $inc: { likesCount: 1 } });
                return {
                    status: 200,
                    message: "liked"
                }
            }
        } catch(err) {
            throw {
                status: 500,
                message: "Failed toggle like on the post."
            }
        }
    }

    static getPostByPostId = async (postId: string) => {
        try {
            const database = getDB();
            const post = await database.collection("post").findOne({ _id: new ObjectId(postId) });
            if (!post) throw { status: 404, message: "Post not found." };
            return {
                status: 200,
                post
            }
        } catch(error) {
            throw error;
        }
    }

    // public async deletePost(postId: string, userId: string) {
    //     try {
            
    //         const snapshot = await this.postCollection.where("postId", "==", postId).get();
    //         console.log("postId", postId.empty);

    //         //Trying to say can only delete if post belongs to user
    //         if (postExists && postId == userId.postId) {

    //         }
    //     } catch(error) {
    //         throw new Error(error);
    //     }
    // }

    // static async getPostByPostId(postId: string, userId: string) {
    //     console.log("getBypostId&userId: ", postId);
    //     try {
    //         const usersCollection = database.collection("post");
    //         const snapshot = await usersCollection.where("postId", "==", postId).get();
            
    //         if (snapshot.empty) throw new Error("Post doesn't exist.")

    //         let user;
    //         snapshot.forEach(doc => user = doc.data());
    //         console.log("process", process.env.JWT_SECRET);
    //         const isMatch = await bcrypt.compare(userId, user.userId);
            
    //         if (isMatch) {
    //             //issue jwt
    //             const payload = {
    //                 userId: "321"
    //             }
    //             return {
    //                 token: this.generateAuthToken(payload, process.env.JWT_SECRET)
    //             }
    //         } else {
    //             throw new Error("postId or userId is incorrect.")
    //         }
    //     } catch(error) {
    //         throw new Error(error);
    //     }
    // }
}

export default PostModel;