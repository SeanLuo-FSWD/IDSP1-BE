import { getDB } from "../util/database.util";
import { ObjectId } from "mongodb";

interface IUserInConversation {
  userId: string;
  username: string;
  avatar: string;
}

class ConversationModel {
  private _db = getDB();
  private _members: string[];
  constructor(members) {
    this._members = members;
  }

  public create = async () => {
    const newConversation: {
      _id?: string;
      members: string[];
      createdAt: number;
    } = {
      members: this._members,
      createdAt: Date.now(),
    };
    await this._db.collection("conversation").insertOne(newConversation);
    return newConversation;
  };

  static getConversationByMembers = async (memberIds: string[]) => {
    const database = getDB();
    const result = await database
      .collection("conversation")
      .find({
        "members.userId": {
          $all: memberIds,
        },
        members: {
          $size: memberIds.length,
        },
      })
      .toArray();
    /** result = conversation[] */
    return result;
  };

  static getAllConversationsByUserId = async (userId) => {
    const database = getDB();
    const result = await database
      .collection("conversation")
      .aggregate([
        { $match: { "members.userId": userId } },
        {
          $project: {
            members: {
              $filter: {
                input: "$members",
                as: "member",
                cond: {
                  $ne: ["$$member.userId", userId],
                },
              },
            },
            conversationId: {
              $toString: "$_id",
            },
            _id: 0,
            createdAt: 1,
          },
        },
        {
          $lookup: {
            from: "message",
            let: { conversationId: "$conversationId" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$conversationId", "$$conversationId"] },
                },
              },
              { $sort: { createdAt: -1 } },
              { $limit: 1 },
            ],
            as: "latestMessage",
          },
        },
        {
          $addFields: {
            orderTimeStamp: {
              $cond: {
                if: {
                  $anyElementTrue: "$latestMessage",
                },
                then: {
                  $arrayElemAt: ["$latestMessage.createdAt", 0],
                },
                else: "$createdAt",
              },
            },
          },
        },
        {
          $sort: {
            orderTimeStamp: -1,
          },
        },
      ])
      .toArray();

    // let displayedConversations = result;

    // if (displayedConversations.length > 0) {
    //   //   displayedConversations = result.filter((conversation) => {
    //   //     conversation.messages.length;
    //   //   });

    //   displayedConversations = result.filter((conversation) => {

    //     return conversation.messages.length > 0;
    //   });

    //   displayedConversations.sort((a, b) => {
    //     const a_date: any = new Date(a.messages[0].createdAt);
    //     const b_date: any = new Date(b.messages[0].createdAt);

    //     return b_date - a_date;
    //   });
    // }

    return result;
  };

  static getMessagesInConversation = async (conversationId) => {
    const database = getDB();
    const result = await database
      .collection("message")
      .find({
        conversationId,
      })
      .toArray();
    return result;
  };

  static getUsersInConversation = async (members) => {
    const database = getDB();
    const result = await database
      .collection("user")
      .aggregate([
        {
          $addFields: {
            userId: {
              $toString: "$_id",
            },
          },
        },
        {
          $match: {
            userId: {
              $in: members,
            },
          },
        },
        {
          $project: {
            userId: 1,
            username: 1,
            avatar: 1,
            _id: 0,
          },
        },
      ])
      .toArray();
    return result;
  };

  static addNewMembersToConversation = async (
    conversationId: string,
    newMembers: string[]
  ) => {
    const database = getDB();
    const newMembersUserObjects = await database
      .collection("user")
      .aggregate([
        {
          $addFields: {
            userId: {
              $toString: "$_id",
            },
          },
        },
        {
          $match: {
            userId: {
              $in: newMembers,
            },
          },
        },
        {
          $project: {
            userId: 1,
            username: 1,
            avatar: 1,
            _id: 0,
          },
        },
      ])
      .toArray();
    await database.collection("conversation").updateOne(
      {
        _id: new ObjectId(conversationId),
      },
      {
        $push: {
          members: {
            $each: newMembersUserObjects,
          },
        },
      }
    );
    return newMembersUserObjects;
  };
}
export default ConversationModel;
