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
    const newConversation: { _id?: string; members: string[] } = {
      members: this._members,
    };
    await this._db.collection("conversation").insertOne(newConversation);
    return newConversation;
  };

  static getConversationByMembers = async (memberIds: string[]) => {
    const database = getDB();

    console.log("memberIds memberIds");

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

    console.log("getConversationByMembers in conversation.model.ts");
    console.log("is this returning by inclusion?");
    console.log(result);

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

    let displayedConversations = result;

    console.log("displayedConversations");
    console.log("1111111111111111111111");
    console.log(result);

    console.log(displayedConversations);

    if (displayedConversations.length > 0) {
      //   displayedConversations = result.filter((conversation) => {
      //     conversation.messages.length;
      //   });

      displayedConversations = result.filter((conversation) => {
        console.log(conversation.messages.length);

        return conversation.messages.length > 0;
      });

      console.log("2222222222222222");
      console.log(displayedConversations);

      displayedConversations.sort((a, b) => {
        const a_date: any = new Date(a.messages[0].createdAt);
        const b_date: any = new Date(b.messages[0].createdAt);

        return b_date - a_date;
      });

      console.log("3333333333333333");
      console.log(displayedConversations);
    }
    console.log("444444444444444444");
    console.log(displayedConversations);

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
    console.log(
      "getUsersInConversationgetUsersInConversationgetUsersInConversation"
    );
    console.log("members members members");
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

  static addNewMembersToConversation = async (
    conversationId: string,
    newMembers: string[]
  ) => {
    console.log(
      "addNewMembersToConversation addNewMembersToConversation addNewMembersToConversation"
    );

    console.log(newMembers);

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
