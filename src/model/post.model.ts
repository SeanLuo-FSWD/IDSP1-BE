import database from "../util/database.util";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

class postModel {
    private _db = database;
    private postId: string;
    private userId: string;
    private timeStamp: string;
    private text: string;
    private image?: string[];
    private postCollection = this._db.collection("posts");
    
    constructor(input) {
        this.postId = input.postId;
        this.userId = input.userId;
        this.timeStamp = input.timeStamp;
        this.text = input.text;
    }


    public async createPost() {
        try {
    
            const postId = this._db.collection('posts').doc("postId").set({
                postId: this.postId
            });

            // const newPost = 
            this.postCollection.add({
                postId: this.postId,
                userId: this.userId,
                timeStamp: this.timeStamp,
                text: this.text
            })

            console.log(postId);

            database.collection('posts').doc(postId).set(newPost)

            // await this.postCollection.add({
            //     postId: this.postId,
            //     userId: this.userId,
            //     text: this.text,
            //     image: this.image
                
            // })

            return { status: "success" };
        } catch(error) {
            throw new Error(error);
        }
    }

    public async deletePost() {
        try {
    
            await this.postCollection.add({
                postId: this.postId,
                userId: this.userId,
                text: this.text,
                image: this.image
                
            })

            return { status: "success" };
        } catch(error) {
            throw new Error(error);
        }
    }

    static async getPostByPostId(postId: string, userId: string) {
        console.log("getBypostId&userId: ", postId);
        try {
            const usersCollection = database.collection("post");
            const snapshot = await usersCollection.where("postId", "==", postId).get();
            
            if (snapshot.empty) throw new Error("Post doesn't exist.")

            let user;
            snapshot.forEach(doc => user = doc.data());
            console.log("process", process.env.JWT_SECRET);
            const isMatch = await bcrypt.compare(userId, user.userId);
            
            if (isMatch) {
                //issue jwt
                const payload = {
                    userId: "321"
                }
                return {
                    token: this.generateAuthToken(payload, process.env.JWT_SECRET)
                }
            } else {
                throw new Error("postId or userId is incorrect.")
            }
        } catch(error) {
            throw new Error(error);
        }
    }
}

export default postModel;