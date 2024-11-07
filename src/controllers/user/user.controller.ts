import { BadRequestException, Body, Controller, Delete, Get, Headers, HttpCode, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { Users } from "src/entity/user/user.entity";
import { UserService } from "src/services/user/user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("list")
    @HttpCode(200)
    async findAll(
        @Headers() headers: { access_token: string },
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('search') search: string,
        @Query('email') email: string,
        @Query('phone') phone: string,
    ): Promise<{ total_items: number, items: Users[] }> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        const pageNumber = parseInt(page, 10) || 1; // Default to page 1
        const limitNumber = parseInt(limit, 10) || 10; // Default to 10 records
        return this.userService.findAll(pageNumber, limitNumber, { email, phone, search });
    }

    @Get("single/:uuid")
    @HttpCode(200)
    async findOne(@Param('uuid') uuid: string, @Headers() headers: { access_token: string },
    ): Promise<Users> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.userService.findOne(uuid);
    }

    @Post("create")
    @HttpCode(200)
    async create(
        @Body() user: Partial<Users>,
        @Headers() headers: { access_token: string },
    ): Promise<Users> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.userService.create(user);
    }

    @Put("update/:uuid")
    async update(
        @Param("uuid") uuid: string,
        @Body() user: Partial<Users>,
        @Headers() headers: { access_token: string },
    ): Promise<Users> {
        if (!headers.access_token) {
            throw new BadRequestException('Unauthorized')
        }
        if (headers.access_token !== 'leasfund.com') {
            throw new BadRequestException('Akses Token Salah!')
        }
        return this.userService.update(uuid, user);
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
        return this.userService.delete(uuid);
    }
}
