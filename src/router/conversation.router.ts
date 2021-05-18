import { Request, Response, NextFunction, Router } from "express";

import { getDB } from "../util/database.util";
import { ObjectId } from "mongodb";

import ConversationService from "../service/conversation.service";

class ConversationRouter {
    public path = "/conversation";
    public router = Router();
    private _service = new ConversationService;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", this.getConversationIdByMembers);
        this.router.get("/:conversationId/message", this.getMessagesInConversation);
        this.router.get("/", this.getAllConversationsByUserId);
    }

    private getConversationIdByMembers = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        const target = req.body.target;
        const senderId = req.body.userId
        const membersInConversation = [...target, senderId];
       
        try {
            const conversation = await this._service.getConversationByConversationId(membersInConversation);
            res.status(200).send(conversation._id);
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
            const conversations = await this._service.getAllConversationsByUserId(userId)
            console.log("all conversation messages", conversations);
            const displayedConversations = conversations.filter(conversation => conversation.messages.length);
        
            res.status(200).send(displayedConversations);
        } catch(error) {
            next(error);
        }
    }
}

export default ConversationRouter;