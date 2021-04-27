import { Request, Response, NextFunction, Router } from 'express';

class UserRouter {
    public path = "/user";
    public router = Router()
    
    constructor() {

    }

    initializeRoutes() {
        
    }

    signup(email: string, password: string) {
        
    }

    login(req: Request, res: Response, next: NextFunction) {
        console.log("user login")

        
    }
}