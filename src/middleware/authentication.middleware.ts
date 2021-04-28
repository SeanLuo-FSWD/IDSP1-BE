import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            isAuthenticated: any
        }
    }
}

function checkAuth(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send({
        status: "error",
        message: "Unauthorized."
    })
}

export {
    checkAuth
}