import { Request, Response, NextFunction, Router } from "express";

import { getDB } from "../util/database.util";
import { ObjectId } from "mongodb";

import ConversationService from "../service/conversation.service";

class ConversationRouter {
  public path = "/conversation";
  public router = Router();
  private _service = new ConversationService();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", this.getConversationByConversationId);
    this.router.get("/:conversationId/message", this.getMessagesInConversation);
    this.router.get("/", this.getAllConversationsByUserId);
    this.router.post("/person", this.getConversationByMembers);
  }

  // renamed from "getConversationIdByMembers" to  "getConversationByConversationId", to match what code actually do.
  // same for the route "this.router.post("/", this.getConversationIdByMembers)"
  private getConversationByConversationId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const target = req.body.target;

    // const senderId = req.body.userId;
    const senderId = req.user.userId;

    const membersInConversation = [...target, senderId];

    try {
      const conversation = await this._service.getConversationByConversationId(
        membersInConversation
      );
      res.status(200).send(conversation);
    } catch (error) {
      next(error);
    }
  };

  private getConversationByMembers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const senderId = req.user.userId;
    const target = req.body.target;
    const membersInConversation = [...target, ...[senderId]];

    try {
      const conversation = await this._service.getConversationByMembers(
        membersInConversation
      );
      if (conversation) res.status(200).send(conversation._id);
      else res.status(200).end();
    } catch (error) {
      next(error);
    }
  };

  private getMessagesInConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const conversationId = req.params.conversationId;
      const database = getDB();
      const messages = await database
        .collection("message")
        .find({ conversationId: conversationId })
        .limit(12)
        .sort({ _id: -1 })
        .toArray();
      res.status(200).send({ messages });
    } catch (error) {
      next(error);
    }
  };

  private getAllConversationsByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.userId;
      const conversations = await this._service.getAllConversationsByUserId(
        userId
      );

      res.status(200).send(conversations);
    } catch (error) {
      next(error);
    }
  };
}

export default ConversationRouter;
