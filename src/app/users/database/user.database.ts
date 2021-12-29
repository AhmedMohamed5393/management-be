import { EventEmitter } from "events";
import { Model } from "mongoose";
import mongoose from "mongoose";
import * as env from "../../../environment";
import { UserSchema, IUser } from "../models/entities/user.model";
import { logger } from "src/app/shared/logger";
export class UserDatabase {
    public static connectionEvents: EventEmitter = new EventEmitter();
    public connection;
    private UserEntity: Model<IUser>;
    constructor() {
        const dburi = env.USER_DBURI;
        const connection = mongoose.createConnection(dburi);
        this.connection = connection;
        mongoose.connection.on("connected", () => {
            logger({ message: "Database is connected " + dburi });
            UserDatabase.connectionEvents.emit("cart connected");
        });
        mongoose.connection.on("error", (err) => {
            logger({ message: "Mongoose default connection has occured an error", error: err });
        });
        mongoose.connection.on("reconnected", () => { logger({ message: "Mongoose default connection is reconnecting" }); });
        mongoose.connection.on("reconnectFailed", () => { logger({ message: "Mongoose default connection reconnection failed" }); });
        mongoose.connection.on("disconnected", (err) => {
            logger({ message: "Mongoose default connection is disconnected" });
            UserDatabase.connectionEvents.emit("cart disconnected");
        });
        process.on("SIGINT", () => {
            mongoose.connection.close(() => {
                logger({ message: "Mongoose default connection is disconnected due to application termination" });
                process.exit(0);
            });
        });
    }
    public getUserEntity(): Model<IUser> {
        if (!this.UserEntity) {
            try { this.UserEntity = this.connection.model("User"); }
            catch (e) { this.UserEntity = this.connection.model("User", UserSchema); }
        }
        return this.UserEntity;
    }
}
