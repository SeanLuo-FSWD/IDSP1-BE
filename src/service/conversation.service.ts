import ConversationModel from "../model/conversation.model";

class ConversationService {
  public getConversationByConversationId = async (members) => {
    console.log("eeeeeeeeeeeeeeeeeeeeee");
    console.log("eeeeeeeeeeeeeeeeeeeeee");
    console.log(members);

    const matchedConversation =
      await ConversationModel.getConversationByMembers(members);

    if (matchedConversation.length) {
      return matchedConversation[0];
    } else {
      const usersInConversation =
        await ConversationModel.getUsersInConversation(members);
      const newConversation = new ConversationModel(usersInConversation);
      return newConversation.create();
    }
  };

  public getAllConversationsByUserId = async (userId) => {
    console.log("conversation service.tssssss");
    console.log(userId);

    const conversations = await ConversationModel.getAllConversationsByUserId(
      userId
    );
    return conversations;
  };
}

export default ConversationService;
