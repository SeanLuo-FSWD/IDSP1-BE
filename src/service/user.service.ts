import UserModel from "../model/user.model"
import PostModel from "../model/post.model";
import LikeModel from "../model/like.model";
import CommentModel from "../model/comment.model";
import ImageModel from "../model/image.model";

class UserService {
    static updateUserAvatar = async (userId, image) => {
        const newAvatarLink = await new ImageModel(image.originalname, image.buffer).upload();
        await UserModel.updateUserAvatar(userId, newAvatarLink);
        await PostModel.updateUserPostsAvatar(userId, newAvatarLink);
        await CommentModel.updateUserCommentsAvatar(userId, newAvatarLink);
        await LikeModel.updateUserLikesAvatar(userId, newAvatarLink);
        return newAvatarLink;
    }
}

export default UserService;