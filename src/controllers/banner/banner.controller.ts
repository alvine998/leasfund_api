import { BadRequestException, Body, Controller, Delete, Get, Headers, HttpCode, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { Banners } from "../../entity/banner/banner.entity";
import { Brands } from "../../entity/brand/brand.entity";
import { BannerService } from "../../services/banner/banner.service";

@Controller("banner")
export class BannerController {
    constructor(private readonly bannerService: BannerService) { }

    @Get("list")
    @HttpCode(200)
    async findAll(
        @Headers() headers: { access_token: string },
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('search') search: string,
        @Query('status') status: number
    ): Promise<{ total_items: number, items: Banners[] }> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        const pageNumber = parseInt(page, 10) || 1; // Default to page 1
        const limitNumber = parseInt(limit, 10) || 10; // Default to 10 records
        return this.bannerService.findAll(pageNumber, limitNumber, { status, search });
    }

    @Get("single/:uuid")
    @HttpCode(200)
    async findOne(@Param('uuid') uuid: string, @Headers() headers: { access_token: string },
    ): Promise<Banners> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.bannerService.findOne(uuid);
    }

    @Post("create")
    @HttpCode(200)
    async create(
        @Body() product: Partial<Banners>,
        @Headers() headers: { access_token: string },
    ): Promise<Banners> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.bannerService.create(product);
    }

    @Put("update/:uuid")
    async update(
        @Param("uuid") uuid: string,
        @Body() product: Partial<Banners>,
        @Headers() headers: { access_token: string },
    ): Promise<Banners> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.bannerService.update(uuid, product);
    }
    @Delete("delete/:uuid")
    async delete(
        @Param("uuid") uuid: string,
        @Headers() headers: { access_token: string },
    ): Promise<{ message: string }> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.bannerService.delete(uuid);
    }
}
