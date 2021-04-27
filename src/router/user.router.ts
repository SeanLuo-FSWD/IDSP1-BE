import { Request, Response, NextFunction, Router } from 'express';

class UserRouter {
    public path = "/user"
    public router = Router()
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signUp`, this.signUp);
        this.router.post(`${this.path}/login`, this.login);
    }

    private signUp = (req: Request, res: Response) => {
        console.log("sign up")
    }

    private login(req: Request, res: Response, next: NextFunction) {
        console.log("user login")
    }
}

export default UserRouter;