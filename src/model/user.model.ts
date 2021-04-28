import database from "../util/database.util";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserModel {
    private _db = database;
    private email: string;
    private password: string;
    private saltRounds: number = 10;
    private usersCollection = this._db.collection("users");
    
    constructor(input) {
        this.email = input.email;
        this.password = input.password;
    }

    public async isExisted() {
        try {
            const user = await this.usersCollection.where("email", "==", this.email).get();
            console.log("user", user.empty);

            return !user.empty;
        } catch(error) {
            return {
                status: "error",
                error: `${error}`
            }
        }
    }

    public async create() {
        try {
            const userId = this.usersCollection.doc().id;
            const passwordHash = await bcrypt.hash(this.password, this.saltRounds);
            
            await this.usersCollection.doc(userId).set({
                email: this.email,
                password: passwordHash,
                userId: userId
            })

            return { status: "success" };
        } catch(error) {
            throw new Error(error);
        }
    }

    static async getUserById(userId: string) {
        try {
            const usersCollection = database.collection("users");
            const userDoc = await usersCollection.doc(userId).get()
            const user = userDoc.exists? userDoc.data() : null;

            return {
                userId: user.userId,
                email: user.email
            }
        } catch(error) {
            throw new Error(error);
        }
    }

    static async getByEmailAndPassword(email: string, password: string) {
        console.log("getByEmail&password: ", email);
        try {
            const usersCollection = database.collection("users");
            const snapshot = await usersCollection.where("email", "==", email).get();
            
            if (snapshot.empty) throw new Error("User doesn't exist.")

            let user;
            snapshot.forEach(doc => user = doc.data());
            console.log("process", process.env.JWT_SECRET);
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (isMatch) {
                //return user
                return {
                    email: user.email,
                    userId: user.userId
                }
            } else {
                throw new Error("Email or password is incorrect.")
            }
        } catch(error) {
            throw new Error(error);
        }
    }
}

export default UserModel;