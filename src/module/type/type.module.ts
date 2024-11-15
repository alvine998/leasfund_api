import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeController } from "src/controllers/type/type.controller";
import { Types } from "src/entity/type/type.entity";
import { TypeService } from "src/services/type/type.service";

@Module({
    imports: [TypeOrmModule.forFeature([Types])],
    providers: [TypeService],
    controllers: [TypeController],
    exports: [TypeService]
})

export class typeModule { }