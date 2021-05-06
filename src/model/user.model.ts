import { getDB } from "../util/database.util";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

class UserModel {
    private _db = getDB();
    private _email: string;
    private _password: string;
    private _profilePhoto: string;
    private _username: string;
    private _emailVerified: boolean;
    private saltRounds: number = 10;
    
    constructor(input) {
        this._email = input.email;
        this._password = input.password;
        this._username = input.username;
        this._emailVerified = false;
        this._profilePhoto = "https://res.cloudinary.com/depk87ok3/image/upload/v1619723749/defaultProfilePhoto-min_zdwber.png";
    }

    public async isExisted() {
        try {
            const user = await this._db.collection("user").findOne({ "email": this._email });
            console.log("user", user);
            return Boolean(user);
        } catch(error) {
            return {
                status: 500,
                error: `Error querying database.`
            }
        }
    }

    public async create() {
        try {
            const passwordHash = await bcrypt.hash(this._password, this.saltRounds);

            const result = await this._db.collection("user").insertOne({
                email: this._email,
                password: passwordHash,
                username: this._username,
                profilePhoto: this._profilePhoto,
                emailVerified: this._emailVerified
            })

            console.log("--- USER MODEL: inserted new user ---");

            return { 
                status: 200,
                email: this._email,
                userId: result.insertedId
            };
        } catch(error) {
            throw {
                status: 500,
                message: "Failed to insert new user into database."
            }
        }
    }

    static async getUserById(userId: string) {
        try {
            const database = getDB();
            const user = await database.collection("user").findOne({ _id: new ObjectId(userId) });
            if (user) {
               return {
                    userId,
                    email: user.email,
                    username: user.username
               }
            } else {
                throw {
                    status: 404,
                    message: "User not found."
                }
            }
        } catch(error) {
            console.log("error");
            throw {
                status: 500,
                message: "Failed to find user in the database."
            }
        }
    }

    static async getByEmailAndPassword(email: string, password: string) {
        console.log("getByEmail&password: ", email);
        try {
            const database = getDB();
            const user = await database.collection("user").findOne({ email });
            console.log("getByEmail&password user: ", user)
            if (!user) throw new Error("User doesn't exist.");

            const isMatch = await bcrypt.compare(password, user.password);
            
            if (isMatch) {
                //return user
                return {
                    email: user.email,
                    userId: user._id.toString(),
                    username: user.username,
                    emailVerified: user.emailVerified
                }
            } else {
                throw {
                    status: 400,
                    message: "Email or password is invalid."
                }
            }
        } catch(error) {
            throw {
                status: 500,
                message: "Fail to access to database."
            }
        }
    }

    static async verifyUserByEmail(userId) {
        try {
            const database = getDB();
            const query = { _id: new ObjectId(userId) };
            const result = await database.collection("user").updateOne(query, { $set: {
                emailVerified: true
            }});

            console.log("result", result);
            return {
                status: 200,
                message: "success"
            }
        } catch(err) {
            return {
                status: 500,
                message: "Failed updating to verify user email."
            }
        }
    }
}

export default UserModel;