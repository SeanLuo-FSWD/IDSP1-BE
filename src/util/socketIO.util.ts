import http from "http";
import { Server } from "socket.io";
import passport from "../util/passport.util";
import sessionMiddlware from "../middleware/session.middleware";

import { getDB } from "../util/database.util";
import { ObjectId } from "mongodb";
import ConversationModel from "../model/conversation.model";

import redis from "../util/redis.util";

class SocketIO {
    private _io;
    private _server;
    private _users = {};
    constructor(app) {
        this._server = http.createServer(app);
        this._io = new Server(this._server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
                credentials: true
            }
        });
        this.initMiddlewares();
        this.ioMessage();
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
        this._io.use((socket, next) => {
            if (socket.request.user) {
                next();
            } else {
                console.log("not authorized");
                // next(new Error("Unauthorized"));
                socket.disconnect();
            }
        });
    }

    private ioMessage = () => {
        this._io.on("connection", socket => {
            console.log("socket io connected");
            const socketUser = socket.request.user;
            //user and correspond socket id caching
            this.cacheUser(socketUser);

            //user enter chatroom
            socket.on("enter chatroom", (data) => {
                console.log("--- entering chatroom ---", data);
                socket.join(data.conversationId);
            });

            socket.on("leaveChatroom", (conversationId) => {
                console.log(`--- leave room: ${conversationId} ---`);
                socket.leave(conversationId);
            })

            socket.on("activeUsers", () => {
                console.log("see active users");
                let activeUsers = [];
                for (let userId in this._users) {
                    activeUsers.push(this._users[userId])
                }
                socket.emit("activeUsers", activeUsers);
            })

            socket.on('chat message', async (msg) => {
                console.log("incoming message", msg)
                const database = getDB();
                const newMessage = {
                    ...msg,
                    createdAt: Date.now()
                }
                await database.collection("message").insertOne(newMessage);
                const messages = await database.collection("message").find({ conversationId: msg.conversationId }).toArray();
                this._io.to(msg.conversationId).emit("received", {messages});
                //emit to chats list
                const conversation = await database.collection("conversation").findOne({ 
                    _id: new ObjectId(msg.conversationId)
                });

                const membersInConversation = conversation.members;
                for (const conversationMember of membersInConversation) {
                    const matchedUser = this._users[conversationMember.userId];
                    const socketId = matchedUser.id;
                    socket.to(socketId).emit("updateChats", msg);
                    
                }
            });

            socket.on("disconnect", (socket) => {
                delete this._users[socketUser.userId]
                console.log("--- disconnect : ", socketUser);
                console.log("--- active users: ", this._users);
            })
        });
    }

    private cacheUser = async (user) => {
        for (let [id, socket] of this._io.of("/").sockets) {
            const isExisted = this._users[user.userId];
            console.log("socekt id", id);
            if (!isExisted) {
                this._users[socket.request.user.userId] = {
                    ...socket.request.user,
                    id: socket.id
                }
            } else {
                this._users[socket.request.user.userId].id = socket.id;
            }
        }
    }
}

export default SocketIO;