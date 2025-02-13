import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeController } from "../../controllers/type/type.controller";
import { Types } from "../../entity/type/type.entity";
import { TypeService } from "../../services/type/type.service";

@Module({
    imports: [TypeOrmModule.forFeature([Types])],
    providers: [TypeService],
    controllers: [TypeController],
    exports: [TypeService]
})

export class typeModule { }