import { Request, Response, NextFunction, Router } from 'express';
import { auth } from 'firebase-admin';
import AuthService from "../service/authentication.service";

class UserRouter {
    public path = "/user"
    public router = Router()
    private authService = new AuthService();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signUp`, this.signUp);
        this.router.post(`${this.path}/login`, this.login);
    }

    private signUp = async (req: Request, res: Response) => {
        console.log("sign up")
        const email = req.body.email;
        const password = req.body.password;

        const userExisted = await this.authService.findUserByEmail(email)

        if (userExisted) {
            res.send({
                status: "error",
                error: "User already exists."
            })
        } else {
            const result = await this.authService.createUser(email, password);
            res.send(result);
        }
    }

    private login(req: Request, res: Response, next: NextFunction) {
        console.log("user login")
    }
}

export default UserRouter;