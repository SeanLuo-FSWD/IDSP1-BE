import { Request, Response, NextFunction, Router } from "express";
import AuthService from "../service/authentication.service";
import { checkAuth } from "../middleware/authentication.middleware";
import UserService from "../service/user.service";
import multerUpload from "../middleware/multerUpload.middleware";

declare global {
    namespace Express {
        interface Request {
            logout: any,
            files: File[]
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
        this.router.post('/signUp', this.signUp);
        this.router.post('/login', this.login);
        this.router.get('/logout', this.logout);
        this.router.get('/verify', this.verifyEmail);
        this.router.get('/authenticate', checkAuth, this.authenticate);
        this.router.post('/avatar/:userId', multerUpload.array("filesToUpload[]"), this.updateProfilePhoto);
    }

    private signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._authService.signUp(req.body);
            res.status(200).send({ message: "success" })
        } catch(error) {
            next(error);
        }
    }

    private login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._authService.login(req, res, next);
            console.log(result);
            res.status(200).send(result);
        } catch(error) {
            next(error);
        }
    }

    private logout = (req: Request, res: Response) => {
        console.log(`--- ${req.user.userId} logout ---`)
        req.logout();

        res.status(200).send({ message: "logout" })
    }

    public authenticate = (req: Request, res: Response) => {
        console.log("--- authenticated user ---");
        res.status(200).send(req.user);
    }

    private verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("--- email verification ---");
            const userId = req.query.id;
            console.log(userId);
            await this._authService.verifyEmail(userId);
            res.status(200).send({ message: "verified" });
        } catch(error) {
            next(error);
        }
    }

    private updateProfilePhoto = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            const image = req.files;
            const newAvatarLink = await UserService.updateUserAvatar(userId, image);
            res.status(200).send({
                userId: req.user.userId,
                email: req.user.email,
                username: req.user.username,
                avatar: newAvatarLink
            });
        } catch(error) {
            next(error);
        }
    }
}

export default UserRouter;