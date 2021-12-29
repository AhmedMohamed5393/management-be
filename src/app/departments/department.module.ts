import { Module } from '@nestjs/common';
import { Service } from './service';
import { DepartmentService } from './services/departmentService';
@Module({ imports: [], controllers: [Service], providers: [DepartmentService] })
export class DepartmentModule {}
