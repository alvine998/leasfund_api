import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BannerController } from "src/controllers/banner/banner.controller";
import { Banners } from "src/entity/banner/banner.entity";
import { BannerService } from "src/services/banner/banner.service";

@Module({
    imports: [TypeOrmModule.forFeature([Banners])],
    providers: [BannerService],
    controllers: [BannerController],
    exports: [BannerService]
})

export class bannerModule { }