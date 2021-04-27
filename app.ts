import express from "express";
import dotenv from "dotenv";

class App {
    private _app: express.Application;
    private readonly _port: number | string = process.env.PORT || 8000;

    
    constructor() {
        this._app = express();
        dotenv.config();

    }

    public startServer() {
        this._app.listen(this._port , () => {
            console.log(`App listening on ${this._port}.`)
        })
    }
}

export default App;