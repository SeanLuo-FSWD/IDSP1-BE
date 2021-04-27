import bcrypt from "bcrypt";
import database from "../util/database.util";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model";

class AuthenticationService {
    private _db = database;

    public async getUserByEmailAndPassword(email: string, password: string) {
        //get by email
    }

    public async signUp(signUpInfo) {
        try {
            const user = new UserModel(signUpInfo);
            const isExisted = await user.isExisted();
    
            if (isExisted) {
                return {
                    status: "error",
                    error: "User already exists."
                }
            } else {
                await user.create();
    
                return {
                    status: "success"
                }
            }
        } catch(error) {
            return {
                status: "error",
                error: `${error}`
            }
        }
    }
}

export default AuthenticationService;