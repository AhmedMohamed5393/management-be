import { logger } from "src/app/shared/logger";
import { DepartmentDatabase } from "../database/department.database";
import { IDepartment } from "../models/entities/Department.model";
import { IDepartmentRepository } from "../models/interfaces/IDepartmentRepository";
import { Model } from "mongoose";
export class DepartmentRepository implements IDepartmentRepository {
    private database: DepartmentDatabase;
    private departmentModel: Model<IDepartment>;
    constructor() {
        DepartmentDatabase.connectionEvents.once("connected", () => { logger({ message: "Fire department database-connected" }); });
        DepartmentDatabase.connectionEvents.once("disconnected", () => { logger({ message: "Fire department database-disconnected" }); });
        this.database = new DepartmentDatabase();
        logger({ message: "Database should be initialized" }); 
        this.departmentModel = this.database.getDepartmentEntity();
    }
}
