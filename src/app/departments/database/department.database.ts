import { EventEmitter } from "events";
import { Model } from "mongoose";
import mongoose from "mongoose";
import * as env from "../../../environment";
import { DepartmentSchema, IDepartment } from "../models/entities/Department.model";
import { logger } from "src/app/shared/logger";
export class DepartmentDatabase {
    public static connectionEvents: EventEmitter = new EventEmitter();
    public connection;
    private DepartmentEntity: Model<IDepartment>;
    constructor() {
        const dburi = env.DEPT_DBURI;
        const connection = mongoose.createConnection(dburi);
        this.connection = connection;
        mongoose.connection.on("connected", () => {
            logger({ message: "Database is connected " + dburi });
            DepartmentDatabase.connectionEvents.emit("cart connected");
        });
        mongoose.connection.on("error", (err) => {
            logger({ message: "Mongoose default connection has occured an error", error: err });
        });
        mongoose.connection.on("reconnected", () => { logger({ message: "Mongoose default connection is reconnecting" }); });
        mongoose.connection.on("reconnectFailed", () => { logger({ message: "Mongoose default connection reconnection failed" }); });
        mongoose.connection.on("disconnected", (err) => {
            logger({ message: "Mongoose default connection is disconnected" });
            DepartmentDatabase.connectionEvents.emit("cart disconnected");
        });
        process.on("SIGINT", () => {
            mongoose.connection.close(() => {
                logger({ message: "Mongoose default connection is disconnected due to application termination" });
                process.exit(0);
            });
        });
    }
    public getDepartmentEntity(): Model<IDepartment> {
        if (!this.DepartmentEntity) {
            try { this.DepartmentEntity = this.connection.model("Department"); }
            catch (e) { this.DepartmentEntity = this.connection.model("Department", DepartmentSchema); }
        }
        return this.DepartmentEntity;
    }
}
