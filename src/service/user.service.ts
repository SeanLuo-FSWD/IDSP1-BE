import UserModel from "../model/user.model";
import PostModel from "../model/post.model";
import LikeModel from "../model/like.model";
import CommentModel from "../model/comment.model";
import ImageModel from "../model/image.model";
import FollowingModels from "../model/following.model";
import FollowingModel from "../model/following.model";

class UserService {
  static updateUserAvatar = async (userId, image) => {
    const newAvatarLink = await new ImageModel(
      image.originalname,
      image.buffer
    ).upload();
    await UserModel.updateUserAvatar(userId, newAvatarLink);
    await PostModel.updateUserPostsAvatar(userId, newAvatarLink);
    await CommentModel.updateUserCommentsAvatar(userId, newAvatarLink);
    await LikeModel.updateUserLikesAvatar(userId, newAvatarLink);
    return newAvatarLink;
  };

  static updateUserProfile = async (userId, updates) => {
    let newAvatarLink;
    if (updates["avatar"]) {
      newAvatarLink = await new ImageModel(
        updates["avatar"].originalname,
        updates["avatar"].buffer
      ).upload();

      updates.avatar = newAvatarLink;
    }
    console.log(updates);
    await UserModel.updateProfile(userId, updates);
    if (updates["avatar"]) {
      await PostModel.updateUserPostsAvatar(userId, newAvatarLink);
      await CommentModel.updateUserCommentsAvatar(userId, newAvatarLink);
      await LikeModel.updateUserLikesAvatar(userId, newAvatarLink);
    }
    const result = await UserModel.getUserById(userId);

    return result;
  };

  static followUser = async (userId, followingUserId) => {
    const result = await new FollowingModel(
      userId,
      followingUserId
    ).toggleFollowing();
    return result;
  };

  static getFollowingUsers = async (userId) => {
    const followingUsers = await FollowingModels.getFollowingUsers(userId);
    return followingUsers;
  };
}

export default UserService;
