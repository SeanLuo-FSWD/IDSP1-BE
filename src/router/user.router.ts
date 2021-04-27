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
        try {
            const result = await this.authService.signUp(req.body)

            if (result.status === "success") {
                res.status(200).send(result);
            } else {
                throw new Error(result.error);
            }
        } catch(error) {
            res.status(400).send({
                status: "error",
                error: `${error}`
            })
        }
    }

    private login(req: Request, res: Response, next: NextFunction) {
        console.log("user login")
    }
}

export default UserRouter;