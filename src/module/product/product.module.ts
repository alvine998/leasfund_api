import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "../../controllers/product/product.controller";
import { Products } from "../../entity/product/product.entity";
import { ProductService } from "../../services/product/product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Products])],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})

export class productModule { }