import { IUserRepository } from "../models/interfaces/IUserRepository";
import { Model } from "mongoose";
import { UserDatabase } from "../database/user.database";
import { IUser } from "../models/entities/user.model";
import { logger } from "src/app/shared/logger";
export class UserRepository implements IUserRepository {
    private database: UserDatabase;
    private userModel: Model<IUser>;
    constructor() {
        UserDatabase.connectionEvents.once("connected", () => { logger({ message: "Fire user database-connected" }); });
        UserDatabase.connectionEvents.once("disconnected", () => { logger({ message: "Fire user database-disconnected" }); });
        this.database = new UserDatabase();
        logger({ message: "Database should be initialized" }); 
        this.userModel = this.database.getUserEntity();
    }
}
