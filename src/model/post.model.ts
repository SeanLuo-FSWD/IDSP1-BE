import database from "../util/database.util";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

class PostModel {
    private _db = database;
    private userId: string;
    private timeStamp: string;
    private text: string;
    private images: string[];
    private postCollection = this._db.collection("posts");
    
    constructor(userId: string, input) {
        this.userId = userId;
        this.timeStamp = new Date().toString();
        this.text = input.text;
        this.images = input.images;//[] for no images,
    }

    public async createPost() {
        try {
            const postId = this.postCollection.doc().id;

            const newPost = {
                postId: postId,
                userId: this.userId,
                timeStamp: this.timeStamp,
                text: this.text,
                images: this.images
            }

            const result = await database.collection('post').doc(postId).set(newPost)

            console.log(result);

            //Figure out what to return here
            return { status: "success" };

        } catch(error) {
            throw new Error(error);
        }
    }

    static async delete(postId) {
        try {
            const postCollection = database.collection('post');

            const result = await postCollection.doc(postId).delete();
            console.log(result);
            return result;
        } catch(err) {
            throw new Error(err);
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