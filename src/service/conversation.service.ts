import { match } from "assert/strict";
import ConversationModel from "../model/conversation.model";

class ConversationService {
    constructor() {

    }

    public getConversationByConversationId = async (members) => {
        const matchedConversation = await ConversationModel.getConversationByMembers(members);

        if (matchedConversation.length) {
            return matchedConversation[0];
        } else {
            const usersInConversation = await ConversationModel.getUsersInConversation(members);
            const newConversation = new ConversationModel(usersInConversation);
            return newConversation.create();
        }
    }

    public getAllConversationsByUserId = async (userId) => {
        const conversations = await ConversationModel.getAllConversationsByUserId(userId);
        return conversations;
    }
}

export default ConversationService;