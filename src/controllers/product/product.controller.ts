import { BadRequestException, Body, Controller, Delete, Get, Headers, HttpCode, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { Products } from "src/entity/product/product.entity";
import { ProductService } from "src/services/product/product.service";

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get("list")
    @HttpCode(200)
    async findAll(
        @Headers() headers: { access_token: string },
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('search') search: string,
        @Query('code') code: string
    ): Promise<{ total_items: number, items: Products[] }> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        const pageNumber = parseInt(page, 10) || 1; // Default to page 1
        const limitNumber = parseInt(limit, 10) || 10; // Default to 10 records
        return this.productService.findAll(pageNumber, limitNumber, { code, search });
    }

    @Get("single/:uuid")
    @HttpCode(200)
    async findOne(@Param('uuid') uuid: string, @Headers() headers: { access_token: string },
    ): Promise<Products> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.productService.findOne(uuid);
    }

    @Post("create")
    @HttpCode(200)
    async create(
        @Body() product: Partial<Products>,
        @Headers() headers: { access_token: string },
    ): Promise<Products> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.productService.create(product);
    }

    @Put("update/:uuid")
    async update(
        @Param("uuid") uuid: string,
        @Body() product: Partial<Products>,
        @Headers() headers: { access_token: string },
    ): Promise<Products> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.productService.update(uuid, product);
    }
    @Delete("delete/:uuid")
    async delete(
        @Param("uuid") uuid: string,
        @Headers() headers: { access_token: string },
    ): Promise<void> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.productService.delete(uuid);
    }
}
