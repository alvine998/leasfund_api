import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "../../controllers/user/user.controller";
import { Users } from "../../entity/user/user.entity";
import { UserService } from "../../services/user/user.service";
import { EmailModule } from "../mail/mail.module";
import { EmailService } from "../../services/mail/mail.service";

@Module({
    imports: [TypeOrmModule.forFeature([Users]), EmailModule],
    providers: [UserService, EmailService],
    controllers: [UserController],
    exports: [UserService]
})

export class userModule { }