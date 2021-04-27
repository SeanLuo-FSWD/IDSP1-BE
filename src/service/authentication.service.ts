import bcrypt from "bcrypt";
import database from "../util/database.util";
import jwt from "jsonwebtoken";

class AuthenticationService {
    private _db = database;

    public async getUserByEmailAndPassword(email: string, password: string) {
        //get by email
    }

    public async findUserByEmail(email: string) {
        //
        try {
            const usersCollection = this._db.collection("users")
            
            const user = await usersCollection.where("email", "==", email).get();
            console.log("user", user.empty);

            return !user.empty;
        } catch(error) {
            return {
                status: "error",
                error: `${error}`
            }
        }
    }

    public async createUser(email, password) {
        try {
            const usersCollection = this._db.collection("users")

            await usersCollection.add({
                email,
                password
            })

            return { status: "success" }
        } catch(error) {
            return {
                status: "error",
                error: `${error}`
            }
        }
    }
}

export default AuthenticationService;