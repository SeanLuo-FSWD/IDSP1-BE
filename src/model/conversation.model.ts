import { getDB } from "../util/database.util";

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
    const newConversation: { _id?: string; members: string[] } = {
      members: this._members,
    };
    await this._db.collection("conversation").insertOne(newConversation);
    return newConversation;
  };

  static getConversationByMembers = async (memberIds: string[]) => {
    const database = getDB();
    console.log("2222222222222222");
    console.log("3333333333333333");
    console.log(memberIds);

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
            as: "messages",
          },
        },
        {
          $match: {
            messages: { $exists: true },
          },
        },
      ])
      .toArray();
    const displayedConversations = result.filter(
      (conversation) => conversation.messages.length
    );
    return displayedConversations;
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
    console.log("3333333333333333");
    console.log("88888888888888888888");
    console.log(members);

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
}
export default ConversationModel;
