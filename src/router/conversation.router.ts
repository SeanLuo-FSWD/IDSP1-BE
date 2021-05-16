import { Request, Response, NextFunction, Router } from "express";

import { getDB } from "../util/database.util";
import { ObjectId } from "mongodb";

class ConversationRouter {
    public path = "/conversation";
    public router = Router();
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", this.createConversation);
        this.router.get("/:conversationId/message", this.getMessagesInConversation);
        this.router.get("/", this.getAllConversationsByUserId);
    }

    private createConversation = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        const target = req.body.target;
        const senderId = req.body.userId
        const membersInConversation = [...target, senderId];
        const database = getDB();
        console.log("memberInConversation", membersInConversation)
        try {
            const matchedConversation = await database.collection('conversation').find({
                "members.userId": {
                    "$all": membersInConversation
                }, 
                members: { 
                    $size: membersInConversation.length
                }
            }).toArray();
            console.log("matched conversation", matchedConversation);

            if (matchedConversation.length) {
                // const messagesInConversation = await database.collection("message").find({ conversationId: matchedConversation[0]._id}).toArray();
                
                res.status(200).send(matchedConversation[0]._id);
            } else {
                const memberObjectIds = membersInConversation.map(userId => new ObjectId(userId));
                const usersInConversation = await database.collection("user").aggregate([
                    {
                        "$match": {
                            "_id": {
                                "$in": memberObjectIds
                            }
                        }
                    },
                    {
                        "$addFields": {
                            "userId": {
                                "$toString": "$_id"
                            }
                        }
                    },
                    {
                        "$project": {
                            "userId": 1,
                            "username": 1,
                            "avatar": 1
                        }
                    }
                ]).toArray();
                console.log("usersInConversation", usersInConversation);
                const newConversation: { _id?: string, members: any[] } = {
                    members: usersInConversation
                }
                await database.collection("conversation").insertOne(newConversation);
                console.log(newConversation);
                res.status(200).send(newConversation._id);
            }
            console.log("matched conversation", matchedConversation);

        } catch(error) {
            next(error);
        }

    }

    private getMessagesInConversation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const conversationId = req.params.conversationId;
            console.log(req.params);
            console.log("get messages conversation Id", conversationId);
            const database = getDB();
            const messages = await database.collection("message").find({ conversationId: conversationId }).toArray();
            console.log("get messages in conversation", messages);
            res.status(200).send({ messages });
        } catch(error) {
            next(error);
        }
    }

    private getAllConversationsByUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            const database = getDB();
            const conversations = await database.collection("conversation").aggregate([
                { $match: {"members.userId": userId }},
                {
                  $project: { 
                        members: {
                            $filter: {
                                 input: "$members",
                                 as: "member",
                                 cond: {
                                    $ne: ["$$member.userId", userId ]
                                 }
                            }
                        },
                        "conversationId": {
                            $toString: "$_id"
                        },
                        _id: 0
                  }
                }, 
                {
                    $lookup: {
                        from: "message",
                        let: { "conversationId": "$conversationId" },
                        pipeline: [
                            {"$match":{"$expr":{"$eq":["$conversationId","$$conversationId"] } } },
                            { $sort: { "createdAt": -1 } },
                            { $limit: 1 }
                        ],
                        as: "messages"
                    }
                }
            ]).toArray();
            console.log("all conversation messages", conversations);
            const displayedConversations = conversations.filter(conversation => conversation.messages.length);
        
            res.status(200).send(displayedConversations);
        } catch(error) {
            next(error);
        }
    }
}

export default ConversationRouter;