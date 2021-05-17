import http from "http";
import { Server } from "socket.io";
import passport from "../util/passport.util";
import sessionMiddlware from "../middleware/session.middleware";

import { getDB } from "../util/database.util";
import { ObjectId } from "mongodb";
import ConversationModel from "../model/conversation.model";

let messages = [
    {
        message_id: 2931,
        userId: "60987e6611edb44e4eb364f7",
        text: "Howdy?",
        createdAt: "2020-10-19 15:00:00",
        conversation_id: 1122
    },
    {
        message_id: 3015,
        userId: "60975d41228ec6290e156124",
        text: "not bad!",
        createdAt: "2020-10-20 19:00:00",
        conversation_id: 1122
    }
];
let conversations = [ 
    {
        conversation_id: 1122,
        members: ["60987e6611edb44e4eb364f7", "60975d41228ec6290e156124"]
    }
];

/** conversation
 * @_id: string
 * @members: [userId]
 */

/**
 * message
 * @conversation_id: string //fk to conversation
 * @userId: string
 * @text: string
 * @createdAt: number
 */

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
        this._io.use((socket, next) => {
            console.log("socket auth session", socket.request.session);
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
                const isExisted = this._users[socket.request.user.userId];
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

            socket.on("createChatroom", (joiner) => {
                console.log("create chat room");
            })



            socket.on('chat message', async (msg) => {
                console.log("msg", msg)
                const database = getDB();
                const newMessage = {
                    ...msg,
                    createdAt: Date.now()
                }
                console.log("--- insert message into database ---");
                await database.collection("message").insertOne(newMessage);
                console.log("--- get messages in conversation ---");
                const messages = await database.collection("message").find({ conversationId: msg.conversationId }).toArray();
                console.log("emit message to frontend", messages);
                this._io.to(msg.conversationId).emit("received", {messages});
                
                //emit to chats list
                const conversation = await database.collection("conversation").findOne({ 
                    _id: new ObjectId(msg.conversationId)
                });

                const membersInConversation = conversation.members;
                for (const conversationMember of membersInConversation) {
                    const matchedUser = this._users[conversationMember.userId];
                    console.log("conversationMemberId", conversationMember.userId);
                    console.log("to socket id", matchedUser.id);
                    
                    const socketId = matchedUser.id;
                    socket.to(socketId).emit("updateChats", msg);
                    
                }



                // const senderId = socket.request.user.userId;
                // const receiverId = msg.to;

                // let conversation;
                // let matchedConversation = await conversations.filter(convo => convo.members.includes(senderId) && convo.members.includes(receiverId));
                // console.log(matchedConversation);
                // if (matchedConversation.length) {
                //     conversation = matchedConversation[0];
                // } else {
                //     conversation = {
                //         members: [receiverId, senderId],
                //         _id: Date.now()
                //     }
                //     conversations.push(conversation);
                // }

                // const newMsg = {
                //     conversation_id: conversation._id,
                //     ...msg
                // }

                // //equals to put message into database.collection("message")
                // messages.push(newMsg);

                // const convoMessages = messages.filter(message => message.conversation_id === conversation._id);

                // console.log(messages);

                // const messageTargetUserId = msg.target;
                
                // const userTarget = this._users.filter(user => user.userId === messageTargetUserId);
                // if (userTarget.length) {
                //     const userTargetSocketId = userTarget[0].id;
                // }
                // console.log(userTarget[0]);
                
                
                // console.log('message:', msg);
                // const msgObj = {
                //     text: msg.text,
                //     timeStamp: Date.now(),
                //     user: socket.request.user.userId
                // }
                // let to;

                // const matchedSender = this._users.filter(user => socket.request.user.userId === user.userId);
                // const matchedSenderId = matchedSender[0].id;
                // console.log("matchedSenderId", matchedSenderId)

                // if (socket.request.user.userId === "60975d41228ec6290e156124") {
                //     const target = "60987e6611edb44e4eb364f7";
                //     const matchedUser = this._users.filter(user => user.userId === target);
                //     to = matchedUser[0].id;
                // } else {
                //     const target = "60975d41228ec6290e156124";
                //     const matchedUser = this._users.filter(user => user.userId === target);
                //     console.log("matchedUser: ", matchedUser);
                //     to = matchedUser[0].id;
                // }
                  
                // messages.push(msgObj);
                // console.log(messages);
                // console.log("message to ", to);
       
                // this._io.to(matchedSenderId).to(to).emit("received", messages);
            });

            socket.on("disconnect", () => {
                // const matchedUserIndex = this._users.indexOf(user => user.userId === socket.request.user.userId);
                // if (matchedUserIndex) {
                //     this._users.splice(matchedUserIndex, 1);
                // }
            })
        });
    }
}

export default SocketIO;