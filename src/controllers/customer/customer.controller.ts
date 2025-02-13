import { BadRequestException, Body, Controller, Delete, Get, Headers, HttpCode, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { Customers, HouseStatus, MarriedStatus } from "../../entity/customer/customer.entity";
import { CustomerService } from "../../services/customer/customer.service";

@Controller("customer")
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get("list")
    @HttpCode(200)
    async findAll(
        @Headers() headers: { access_token: string },
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('search') search: string,
        @Query('status') status: number,
        @Query('marriage_status') marriage_status: MarriedStatus,
        @Query('house_status') house_status: HouseStatus,
        @Query('nik') nik: string,
        @Query('phone') phone: string,
    ): Promise<{ total_items: number, items: Customers[] }> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        const pageNumber = parseInt(page, 10) || 1; // Default to page 1
        const limitNumber = parseInt(limit, 10) || 10; // Default to 10 records
        return this.customerService.findAll(pageNumber, limitNumber, { status, marriage_status, house_status, nik, phone, search });
    }

    @Get("single/:uuid")
    @HttpCode(200)
    async findOne(@Param('uuid') uuid: string, @Headers() headers: { access_token: string },
    ): Promise<Customers> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.customerService.findOne(uuid);
    }

    @Post("create")
    @HttpCode(200)
    async create(
        @Body() customer: Partial<Customers>,
        @Headers() headers: { access_token: string },
    ): Promise<Customers> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.customerService.create(customer);
    }

    @Put("update/:uuid")
    async update(
        @Param("uuid") uuid: string,
        @Body() customer: Partial<Customers>,
        @Headers() headers: { access_token: string },
    ): Promise<Customers> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.customerService.update(uuid, customer);
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
        return this.customerService.delete(uuid);
    }
}
