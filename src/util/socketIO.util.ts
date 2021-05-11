import http from "http";
import { Server } from "socket.io";
import session from "express-session";
import passport from "../util/passport.util";
import sessionMiddlware from "../middleware/session.middleware";

let messages = [];

class SocketIO {
    private _io;
    private _server;
    private _users = [];
    constructor(app) {
        this._server = http.createServer(app);
        this._io = new Server(this._server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });
        this.initMiddlewares();
        this.ioMessage();
        this.initSocketAuth();
    }

    private wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

    initServer = () => {
        this._server.listen(8000, () => {
            console.log("listening");
        })
    }

    initMiddlewares() {
        console.log("init socket middleware");
        this._io.use(this.wrap(sessionMiddlware));
        this._io.use(this.wrap(passport.initialize()));
        this._io.use(this.wrap(passport.session()));
    }

    initSocketAuth() {
        console.log("init socket auth");
        this._io.use((socket, next) => {
            if (socket.request.user) {
                next();
            } else {
                console.log("not authorized");
                next(new Error("Unauthorized"));
            }
        });
    }

    private ioMessage = () => {
        this._io.on("connection", socket => {
            console.log("socket io connected");

            for (let [id, socket] of this._io.of("/").sockets) {
                const isExisted = this._users.filter(user => user.userId === socket.request.user.userId);
                if (!isExisted.length) {
                    this._users.push({
                        ...socket.request.user,
                        id
                    });
                } else {
                    const matchedUserIndex = this._users.indexOf(user => user.userId === socket.request.user.userId);
                    console.log(matchedUserIndex);
                    if (matchedUserIndex >= 0) {
                        this._users[matchedUserIndex].id = id;
                    }
                }
            }

            console.log(this._users);

            socket.on('chat message', (msg) => {
                console.log('message:', msg);
                const msgObj = {
                    text: msg.text,
                    timeStamp: Date.now(),
                    user: socket.request.user.userId
                }
                let to;

                const matchedSender = this._users.filter(user => socket.request.user.userId === user.userId);
                const matchedSenderId = matchedSender[0].id;
                console.log("matchedSenderId", matchedSenderId)

                if (socket.request.user.userId === "60975d41228ec6290e156124") {
                    const target = "60987e6611edb44e4eb364f7";
                    const matchedUser = this._users.filter(user => user.userId === target);
                    to = matchedUser[0].id;
                } else {
                    const target = "60975d41228ec6290e156124";
                    const matchedUser = this._users.filter(user => user.userId === target);
                    console.log("matchedUser: ", matchedUser);
                    to = matchedUser[0].id;
                }
                  
                messages.push(msgObj);
                console.log(messages);
                console.log("message to ", to);

                this._io.to(matchedSenderId).to(to).emit("received", messages);
            });

            socket.on("disconnect", () => {
                const matchedUserIndex = this._users.indexOf(user => user.userId === socket.request.user.userId);
                if (matchedUserIndex) {
                    this._users.splice(matchedUserIndex, 1);
                }
            })
        });


        
    }
}

export default SocketIO;