import { Request, Response, NextFunction, Router } from 'express';
import AuthService from "../service/authentication.service";

class UserRouter {
    public path = "/user"
    public router = Router()
    private _authService = new AuthService();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signUp`, this.signUp);
        this.router.post(`${this.path}/login`, this.login);
    }

    private signUp = async (req: Request, res: Response) => {
        try {
            const result = await this._authService.signUp(req.body)
            
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

    private login = async (req: Request, res: Response, next: NextFunction) => {
        console.log("user login")
        try {
            const email = req.body.email;
            const password = req.body.password;
            const result = await this._authService.login(email, password);
            if (result.status === "success") {
                res.status(200).send(result);
            } else {
                throw new Error(result.error);
            }
        } catch(error) {
            console.log("error", error)
            res.status(400).send({
                status: "error",
                error: `${error}`
            })
        }
    }
}

export default UserRouter;