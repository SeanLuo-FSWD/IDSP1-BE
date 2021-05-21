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
    // this.router.post("/", this.createConversation);
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

    console.log(
      "conversation.router.ts --- getConversationIdByMembers : membersInConversation"
    );
    console.log(target);

    console.log(membersInConversation);

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

    console.log("conversation.router.ts ----- getConversationByMembers");
    console.log(membersInConversation);

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
        .limit(5)
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
    console.log(
      "getAllConversationsByUserIdgetAllConversationsByUserIdgetAllConversationsByUserId"
    );

    try {
      const userId = req.user.userId;
      const conversations = await this._service.getAllConversationsByUserId(
        userId
      );
      const displayedConversations = conversations.filter(
        (conversation) => conversation.messages.length
      );

      res.status(200).send(displayedConversations);
    } catch (error) {
      next(error);
    }
  };

  private createConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const target = req.body.target;
    const senderId = req.user.userId;
    const membersInConversation = [...target, senderId];
    // const membersInConversation = [target, senderId];

    const database = getDB();
    try {
      const matchedConversation = await database
        .collection("conversation")
        .find({
          "members.userId": {
            $all: membersInConversation,
          },
          members: {
            $size: membersInConversation.length,
          },
        })
        .toArray();

      if (matchedConversation.length) {
        res.status(200).send(matchedConversation[0]._id);
      } else {
        const memberObjectIds = membersInConversation.map(
          (userId) => new ObjectId(userId)
        );
        const usersInConversation = await database
          .collection("user")
          .aggregate([
            {
              $match: {
                _id: {
                  $in: memberObjectIds,
                },
              },
            },
            {
              $addFields: {
                userId: {
                  $toString: "$_id",
                },
              },
            },
            {
              $project: {
                userId: 1,
                username: 1,
                avatar: 1,
              },
            },
          ])
          .toArray();
        const newConversation: { _id?: string; members: any[] } = {
          members: usersInConversation,
        };
        await database.collection("conversation").insertOne(newConversation);
        res.status(200).send(newConversation._id);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default ConversationRouter;
