import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "src/controllers/transaction/transaction.controller";
import { Transactions } from "src/entity/transaction/transaction.entity";
import { TransactionService } from "src/services/transaction/transaction.service";

@Module({
    imports: [TypeOrmModule.forFeature([Transactions])],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports: [TransactionService]
})

export class transactionModule { }