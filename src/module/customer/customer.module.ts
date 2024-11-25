import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerController } from "src/controllers/customer/customer.controller";
import { Customers } from "src/entity/customer/customer.entity";
import { CustomerService } from "src/services/customer/customer.service";

@Module({
    imports: [TypeOrmModule.forFeature([Customers])],
    providers: [CustomerService],
    controllers: [CustomerController],
    exports: [CustomerService]
})

export class customerModule { }