import { getDB } from "../util/database.util";

class ConversationModel {
    private _db = getDB();
    private _members: {
        username: string,
        userId: string,
    }[]
    constructor() {
        
    }

    public create = async () => {
        
    }
}