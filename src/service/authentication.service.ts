import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model";
import passport from "../util/passport.util";

declare global {
    namespace Express {
        interface Request {
            user: {
                userId: string,
                email: string
            } //or other type you would like to use,
            sessionID: string,
            login: any
        }
    }
}

class AuthenticationService {
    public login(req, res, next): Promise<{ statusCode: number, message: string, userId: string, username: string}> {
        return new Promise((resolve, reject) => {
            console.log("auth promise");
            console.log(passport.Strategy);
            passport.authenticate('local', function (err, user) {
                if (err) reject({ statusCode: 400, message: err.message });
                if (!user) reject({ statusCode: 404, message: "User not found" });

                //login is coded by passport, it writes the user information into session
                req.login(user, loginError => {
                    if (loginError) reject({ statusCode: 500, message: "Login error."});
                    resolve({ statusCode: 200, message: "success", userId: user.userId, username: user.username });
                })
            })(req, res, next);
        })
    };

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
    };

    public async verifyEmail(userId) {
        try {
            const user = await UserModel.getUserById(userId);
            console.log(user);
            if (user) {
                const result = await UserModel.verifyUserByEmail(userId);
                return result;
            } else {
                return {
                    status: 404,
                    message: "User not found."
                }
            }
        } catch(err) {
            return {
                status: 500,
                message: "Failed connecting to database."
            }
        }

    }
}

export default AuthenticationService;