import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerController } from "../../controllers/customer/customer.controller";
import { Customers } from "../../entity/customer/customer.entity";
import { CustomerService } from "../../services/customer/customer.service";

@Module({
    imports: [TypeOrmModule.forFeature([Customers])],
    providers: [CustomerService],
    controllers: [CustomerController],
    exports: [CustomerService]
})

export class customerModule { }