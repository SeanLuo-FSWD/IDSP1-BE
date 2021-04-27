import database from "../util/database.util";
import bcrypt from "bcrypt";

class User {
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

            return { status: "success" }
        } catch(error) {
            return {
                status: "error",
                error: `${error}`
            }
        }
    }
}

export default User;