import { getDB, client } from "../util/database.util";
import { ObjectId } from "mongodb";
import _ from "lodash";

class FilterHelper {
  private _return_col;
  private _filter;
  private _db = getDB();
  private _userId;

  constructor(return_col: string, filter: any, userId: string) {
    this._return_col = return_col;
    this._filter = filter;
    this._userId = userId;
  }

  private async postTextQuery(kwArr: Array<string>) {
    let kw_query_arr = [];

    kwArr.forEach((kw) => {
      kw_query_arr.push({
        text: { $regex: `.*${kw}.*` },
      });
    });

    const filter = {
      $match: { $and: kw_query_arr },
    };

    return filter;
  }

  private async getPostCollection() {
    let post_arr_query = [];
    let postCollection: any = [];

    if (this._filter.feed.keywords.length > 0) {
      post_arr_query.push(await this.postTextQuery(this._filter.feed.keywords));
    }
    if (this._filter.feed.hasImg) {
      post_arr_query.push(await { $match: { "images.0": { $exists: true } } });
    }

    postCollection = await this._db
      .collection("post")
      .aggregate(post_arr_query)
      .sort({ _id: -1 });

    return await postCollection.toArray();
  }

  private async getUserCollection() {
    let user_arr_query = [];

    if (this._filter.people.age.length > 0) {
      user_arr_query.push(
        await {
          $match: {
            age: {
              $gte: this._filter.people.age[0],
              $lte: this._filter.people.age[1],
            },
          },
        }
      );
    }

    // gender
    user_arr_query.push(
      await {
        $match: {
          gender: { $in: this._filter.people.gender },
        },
      }
    );

    // location
    user_arr_query.push(
      await {
        $match: {
          location: { $in: this._filter.people.location },
        },
      }
    );

    //followed
    if (this._filter.people.followed) {
      const followed_users = await this._db
        .collection("following")
        .find({ userId: this._userId })
        .toArray();

      const followingUserIdArr = followed_users.map((fu) => {
        return new ObjectId(fu.followingUserId);
      });

      user_arr_query.push(
        await {
          $match: {
            _id: { $in: followingUserIdArr },
          },
        }
      );
    }
    const userCollection = await this._db
      .collection("user")
      .aggregate(user_arr_query)
      .sort({ lastLogin: -1, _id: -1 });

    return await userCollection.toArray();
  }

  public async applyFilter() {
    // const return_filter = this._filter[this._return_col];
    const matched_post_arr = await this.getPostCollection();

    const matched_user_arr = await this.getUserCollection();
    let return_arr;
    console.log("88888888888888888888");
    console.log("matched_post_arr");
    console.log(matched_post_arr);

    console.log("88888888888888888888");
    console.log("matched_user_arr");
    console.log(matched_user_arr);

    if (this._return_col === "post") {
      const user_arr_ids = matched_user_arr.map((u) => {
        return u._id.toString();
      });

      return_arr = _.filter(matched_post_arr, (p) =>
        user_arr_ids.includes(p.userId)
      );
    } else {
      if (this._filter.feed.keywords.length > 0 || this._filter.feed.hasImg) {
        const post_arr_userIds = matched_post_arr.map((p) => {
          return p.userId;
        });
        return_arr = _.filter(matched_user_arr, (u) =>
          post_arr_userIds.includes(u._id.toString())
        );
      } else {
        return_arr = matched_user_arr;
      }
    }

    return return_arr;
  }
}

export default FilterHelper;
