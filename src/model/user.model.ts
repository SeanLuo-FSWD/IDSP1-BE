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
            const passwordHash = await bcrypt.hash(this.password, this.saltRounds);
            
            await this.usersCollection.add({
                email: this.email,
                password: passwordHash
            })

            return { status: "success" };
        } catch(error) {
            throw new Error(error);
        }
    }

    static generateAuthToken = (payload, jwtSecret) => {
        const token = jwt.sign(payload, jwtSecret);
        return token;
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
                //issue jwt
                const payload = {
                    userId: "321"
                }
                return {
                    token: this.generateAuthToken(payload, process.env.JWT_SECRET)
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