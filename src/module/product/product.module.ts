import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "src/controllers/product/product.controller";
import { Products } from "src/entity/product/product.entity";
import { ProductService } from "src/services/product/product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Products])],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})

export class productModule { }