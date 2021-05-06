import { getDB } from "../util/database.util";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

class PostModel {
    private userId: string;
    private timeStamp: string;
    private text: string;
    private images: string[];
    private _likesCount: number;
    private _db = getDB();
    private postCollection = this._db.collection("posts");
    
    constructor(userId: string, input) {
        this.userId = userId;
        this.timeStamp = new Date().toString();
        this.text = input.text;
        this.images = input.images;//[] for no images,  
        this._likesCount = 0;
    }

    public async createPost() {
        try {
            const postId = this.postCollection.doc().id;
            console.log(postId, this.userId);
            const newPost = {
                postId: postId,
                userId: this.userId,
                timeStamp: this.timeStamp,
                text: this.text,
                images: this.images,
                likesCount: this._likesCount
            }

            console.log("new post", newPost);

            const result = await this.postCollection.doc(postId).set(newPost)

            console.log(result);

            //Figure out what to return here
            return { status: "success" };

        } catch(error) {
            throw new Error(error);
        }
    }

    static async delete(userId, postId) {
        try {
            const postCollection = database.collection('post');

            const doc = await postCollection.doc(postId).get();
            
            if (!doc.exists) throw new Error("Post not exists.");
            const post = doc.data();
            const postOwner = post.userId;
            
            if (postOwner === userId) {
                const result = await postCollection.doc(postId).delete();
                return result;
            } else {
                throw new Error("Unauthorized post deletion.");
            }
        } catch(err) {
            throw new Error(err);
        }
    }

    static async updatePostLike(postId, likesArray) {
        try {
            const result = await this._postCollection
        } catch(err) {
            console.log(err);
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