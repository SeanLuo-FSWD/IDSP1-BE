import { Request, Response, NextFunction, Router } from "express";
import AuthService from "../service/authentication.service";

declare global {
    namespace Express {
        interface Request {
            logout: any
        }
    }
}


class UserRouter {
    public path = "/user";
    public router = Router();
    private _authService = new AuthService();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signUp`, this.signUp);
        this.router.post(`${this.path}/login`, this.login);
        this.router.get(`${this.path}/logout`, this.logout);
        this.router.get(`${this.path}/verify`, this.verifyEmail)
    }

    private signUp = async (req: Request, res: Response) => {
        try {
            const result = await this._authService.signUp(req.body);
            if (result.status === 200) {
                res.status(200).send({ message: "success" })
            } else {
                throw {
                    status: result.status,
                    message: result.message
                }
            }
        } catch(error) {
            console.log(error);
            res.status(error.status).send({ message: error.message })
        }
    }

    private login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._authService.login(req, res, next);
            console.log(result);
            res.status(result.statusCode).send({ message: result.message, userId: result.userId, username: result.username});
        } catch(err) {
            res.status(err.statusCode).send({ message: err.message });
        }
    }

    private logout = (req: Request, res: Response) => {
        req.logout();
        console.log("user logout");
        res.status(200).send({ message: "logout" })
    }

    private verifyEmail = async (req: Request, res: Response) => {
        try {
            console.log("--- email verification ---");
            const userId = req.query.id;
            console.log(userId);
            const result = await this._authService.verifyEmail(userId);
            res.status(result.status).send({ message: result.message });
        } catch(err) {
            res.status(400).send({ message: "Bad Request." })
        }
    }
}

export default UserRouter;