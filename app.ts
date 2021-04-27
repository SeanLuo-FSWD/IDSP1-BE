import express from "express";
import dotenv from "dotenv";

import APIRouter from './src/router/api.router';

class App {
    private _app: express.Application;
    private readonly _port: number | string = process.env.PORT || 8000;
    private apiRouter = new APIRouter();
    
    constructor() {
        this._app = express();
        dotenv.config();
        this.initializeMiddleWares();
        this.initAPIRouter();
    }

    public startServer() {
        this._app.listen(this._port , () => {
            console.log(`App listening on ${this._port}.`)
        })
    }

    public initializeMiddleWares() {
        require("./src/middleware/express.middleware")(this._app);
    }

    public initAPIRouter() {
        this._app.use("/", this.apiRouter.router);
    }
}

export default App;