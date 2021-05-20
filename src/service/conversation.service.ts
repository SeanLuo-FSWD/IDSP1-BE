import ConversationModel from "../model/conversation.model";

class ConversationService {
    public getConversationByConversationId = async (members) => {
        const matchedConversation = await ConversationModel.getConversationByMembers(members);

        if (matchedConversation.length) {
            return matchedConversation[0];
        } else {
            const usersInConversation = await ConversationModel.getUsersInConversation(members);
            const newConversation = new ConversationModel(usersInConversation);
            const result = newConversation.create();
            return {
                ...result,
                isNewConversation: true
            }
        }
    }

  public getConversationByMembers = async (members) => {
    const matchedConversation =
      await ConversationModel.getConversationByMembers(members);

    if (matchedConversation.length) {
      return matchedConversation[0];
    } else {
      return null;
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
