import { getDB, client } from "../util/database.util";
import { ObjectId } from "mongodb";
import CommentModel from "./comment.model";
import FilterHelper from "./_filter.helper";

class PostModel {
  private _userId: string;
  private _username: string;
  private _avatar: string;
  private _createdAt: string;
  private _text: string;
  private _images: string[];
  private _likesCount: number;
  private _commentsCount: number;
  private _db = getDB();

  constructor(user, input) {
    this._userId = user.userId;
    this._username = user.username;
    this._avatar = user.avatar;
    this._createdAt = new Date().toString();
    this._text = input.text;
    this._images = input.images; //[] for no images,
    this._likesCount = 0;
    this._commentsCount = 0;
  }

  static async getFeed(filter: any, user: any) {
    console.log("getFeed getFeed getFeed : filter");
    console.log(filter);
    console.log(user);
    let desired_posts: any = [];

    const filterHelper = new FilterHelper("post", filter, user.userId);

    if (filter.applied) {
      desired_posts = filterHelper.applyFilter();
    } else {
      const database = getDB();
      desired_posts = await database
        .collection("post")
        .find()
        .sort({ createdAt: -1 })
        .toArray();
    }

    // console.log("getFeed: all posts", post);
    return desired_posts;
  }

  public async create() {
    const newPost = {
      userId: this._userId,
      username: this._username,
      avatar: this._avatar,
      createdAt: this._createdAt,
      text: this._text,
      images: this._images,
      likesCount: this._likesCount,
      commentsCount: this._commentsCount,
    };

    const result = await this._db.collection("post").insertOne(newPost);
    console.log("newPost", newPost);
    //Figure out what to return here
    return newPost;
  }

  static async delete(userId, postId) {
    const database = getDB();

    const deleteResult = await database.collection("post").deleteOne({
      _id: new ObjectId(postId),
      userId: userId,
    });
    return Boolean(deleteResult.deletedCount);
  }

  static async togglePostLike(user, postId: string) {
    const database = getDB();
    const session = client.startSession();
    const userId = user.userId;
    const like = {
      postId,
      userId,
      username: user.username,
      avatar: user.avatar,
    };
    session.startTransaction();
    const isLiked = await database
      .collection("like")
      .findOne({ postId, userId });
    if (isLiked) {
      await database.collection("like").deleteOne({ postId, userId });
      await database
        .collection("post")
        .updateOne({ _id: new ObjectId(postId) }, { $inc: { likesCount: -1 } });
    } else {
      await database.collection("like").insertOne(like);
      await database
        .collection("post")
        .updateOne({ _id: new ObjectId(postId) }, { $inc: { likesCount: 1 } });
    }
    await session.commitTransaction();
    return isLiked ? "unliked" : "liked";
  }

  static getPostsByUserId = async (userId: string) => {
    const database = getDB();
    const posts = await database
      .collection("post")
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .toArray();

    console.log(
      "getPostsByUserId getPostsByUserId getPostsByUserId getPostsByUserId"
    );

    console.log(posts);

    return posts;
  };

  static getPostByPostId = async (postId: string) => {
    const database = getDB();
    const post = await database
      .collection("post")
      .findOne({ _id: new ObjectId(postId) });
    return post;
  };

  static getFullPostByPostId = async (postId: string) => {
    console.log("get full post model", postId);
    const database = getDB();
    const post = await database
      .collection("post")
      .aggregate([
        {
          $addFields: { postId: { $toString: "$_id" } },
        },
        {
          $lookup: {
            from: "comment",
            localField: "postId",
            foreignField: "postId",
            as: "comments",
          },
        },
        {
          $lookup: {
            from: "like",
            localField: "postId",
            foreignField: "postId",
            as: "likes",
          },
        },
      ])
      .toArray();

    console.log("aggregate", post);
    return post[0];
  };

  //   static updateUserPostsAvatar = async (
  //     postId: string,
  //     newAvatarLink: string
  //   ) => {
  //     const database = getDB();
  //     await database.collection("post").update(
  //       {
  //         _id: new ObjectId(postId),
  //       },
  //       {
  //         $set: {
  //           avatar: newAvatarLink,
  //         },
  //       }
  //     );
  //     return "success";
  //   };

  static updateUserPostsAvatar = async (
    userId: string,
    newAvatarLink: string
  ) => {
    console.log("000000000000000000000");
    console.log("updateUserPostsAvatar");
    console.log(newAvatarLink);
    console.log(userId);

    const database = getDB();
    await database.collection("post").update(
      {
        userId: userId,
      },
      {
        $set: {
          avatar: newAvatarLink,
        },
      }
    );
    return "success";
  };
}

export default PostModel;
