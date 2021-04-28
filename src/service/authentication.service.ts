import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model";

class AuthenticationService {
    public async login(callback) {
    }

    public async signUp(signUpInfo) {
        //signUpInfo: { email: .., password: .. }
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