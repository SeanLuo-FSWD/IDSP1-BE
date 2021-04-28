import { Request, Response, NextFunction, Router } from "express";
import AuthService from "../service/authentication.service";
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
        passport.authenticate("local", function (err, user) {
            if (err) return next(err);
            if (!user) return res.status(400).send({ status: "error", message: "User not found." });
            req.login(user, loginError => {
                if (loginError) return next(loginError);
                return res.status(200).send({ status: "success", message: "authenticated" });
            })
        })(req, res, next);
    }
}

export default UserRouter;