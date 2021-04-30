import express from "express";
import dotenv from "dotenv";

import APIRouter from './src/router/api.router';

class App {
    private _app: express.Application;
    private readonly _port;
    private apiRouter = new APIRouter();
    
    constructor() {
        this._app = express();
        dotenv.config();
        this.initializeMiddleWares();
        this.initAPIRouter();
        console.log(process.env.PORT);
        this._port = process.env.PORT || 8000;
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
        this._app.get("/", (req,res) => {
            console.log("app.get");
        })
    }

    get app() {
        return this._app;
    }
}

export default App;