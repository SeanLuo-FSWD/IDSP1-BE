import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model";

class AuthenticationService {
    public async login(email: string, password: string) {
        console.log("login service")
        try {
            const result = await UserModel.getByEmailAndPassword(email, password);
            console.log("result", result);
            return {
                status: "success",
                token: result.token
            }
        } catch(error) {
            return {
                status: "error",
                error: `${error}`
            }
        }
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