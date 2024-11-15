import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandController } from "src/controllers/brand/brand.controller";
import { Brands } from "src/entity/brand/brand.entity";
import { BrandService } from "src/services/brand/brand.service";

@Module({
    imports: [TypeOrmModule.forFeature([Brands])],
    providers: [BrandService],
    controllers: [BrandController],
    exports: [BrandService]
})

export class brandModule { }