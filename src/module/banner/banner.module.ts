import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BannerController } from "../../controllers/banner/banner.controller";
import { Banners } from "../../entity/banner/banner.entity";
import { BannerService } from "../../services/banner/banner.service";

@Module({
    imports: [TypeOrmModule.forFeature([Banners])],
    providers: [BannerService],
    controllers: [BannerController],
    exports: [BannerService]
})

export class bannerModule { }