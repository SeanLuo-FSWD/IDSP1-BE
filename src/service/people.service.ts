import PostModel from "../model/post.model";
import ImageModel from "../model/image.model";
import LikeModel from "../model/like.model";
import UserModel from "../model/user.model";

class PeopleService {
  public async getPeople(filter: any) {
    const result = await UserModel.getPeople(filter);
    return result;
  }

  public async getPerson(userId: string) {
    console.log("getPerson UserId");
    console.log(userId);

    const user = await UserModel.getUserById(userId);
    let posts = [];
    if (user) {
      posts = await PostModel.getPostsByUserId(user.userId);
    }
    console.log("getPerson getPerson getPerson getPerson");
    console.log(user);

    return { user: user, posts: posts };
  }
}

export default PeopleService;
