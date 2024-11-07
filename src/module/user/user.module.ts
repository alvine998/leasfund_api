import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/controllers/user/user.controller";
import { Users } from "src/entity/user/user.entity";
import { UserService } from "src/services/user/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})

export class userModule { }