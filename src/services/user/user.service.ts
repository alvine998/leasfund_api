import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entity/user/user.entity";
import { FindOptionsWhere, Like, Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { generateRandomString } from "src/utils";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) { }

    // Create user
    async create(user: Partial<Users>): Promise<Users> {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
        user.referral_code = generateRandomString();
        const existData = await this.userRepository.findOne({
            where: [{
                deleted_at: null,
                email: user.email,
            }, {
                deleted_at: null,
                phone: user.phone,
            }]
        })
        if (existData) {
            throw new BadRequestException('Email atau No Telepon sudah terdaftar!')
        }
        const result = this.userRepository.create(user)
        return await this.userRepository.save(result);
    }

    // Get Users
    async findAll(page: number = 1, limit: number = 10, query: { email?: string, phone?: string, search?: string }): Promise<{ total_items: number, items: Users[] }> {
        const [items, total_items] = await this.userRepository.findAndCount({
            where: {
                ...query.email && { email: query.email },
                ...query.phone && { phone: query.phone },
                ...query.search && { name: Like(`%${query.search}%`) },
                deleted_at: null
            },
            skip: (page - 1) * limit,
            take: limit
        })
        return {
            total_items: total_items,
            items: items
        };
    }

    // Get User
    async findOne(uuid: string): Promise<Users> {
        return await this.userRepository.findOne({ where: { uuid } as FindOptionsWhere<Users> });
    }

    // Update User
    async update(uuid: string, user: Partial<Users>): Promise<Users> {
        const updatedAt = new Date()
        await this, this.userRepository.update(uuid, { ...user, updated_at: updatedAt });
        return this.findOne(uuid);
    }

    // Delete user
    async delete(uuid: string): Promise<void> {
        await this.userRepository.softDelete(uuid)
    }
}