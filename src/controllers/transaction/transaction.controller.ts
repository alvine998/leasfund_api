import { BadRequestException, Body, Controller, Delete, Get, Headers, HttpCode, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { Transactions } from "src/entity/transaction/transaction.entity";
import { TransactionService } from "src/services/transaction/transaction.service";

@Controller("transaction")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Get("list")
    @HttpCode(200)
    async findAll(
        @Headers() headers: { access_token: string },
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('search') search: string,
        @Query('status') status: number,
        @Query('year') year: number,
        @Query('bpkb') bpkb: string,
        @Query('brand') brand: string,
        @Query('customer_uuid') customer_uuid: string,
        @Query('user_uuid') user_uuid: string,
        @Query('loan_amount') loan_amount: number,
        @Query('plat_no') plat_no: string,
        @Query('date_start') date_start: Date,
        @Query('date_end') date_end: Date,
        @Query('tenor') tenor: number,
    ): Promise<{ total_items: number, items: Transactions[] }> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        const pageNumber = parseInt(page, 10) || 1; // Default to page 1
        const limitNumber = parseInt(limit, 10) || 10; // Default to 10 records
        return this.transactionService.findAll(pageNumber, limitNumber, { brand, customer_uuid, loan_amount, user_uuid, plat_no, tenor, status, year, bpkb, search, date_start, date_end });
    }

    @Get("single/:uuid")
    @HttpCode(200)
    async findOne(@Param('uuid') uuid: string, @Headers() headers: { access_token: string },
    ): Promise<Transactions> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.transactionService.findOne(uuid);
    }

    @Post("create")
    @HttpCode(200)
    async create(
        @Body() transaction: Partial<Transactions>,
        @Headers() headers: { access_token: string },
    ): Promise<Transactions> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.transactionService.create(transaction);
    }

    @Put("update/:uuid")
    async update(
        @Param("uuid") uuid: string,
        @Body() transaction: Partial<Transactions>,
        @Headers() headers: { access_token: string },
    ): Promise<Transactions> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.transactionService.update(uuid, transaction);
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
        return this.transactionService.delete(uuid);
    }
}
