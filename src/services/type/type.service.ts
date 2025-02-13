import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Like, Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { generateRandomString } from "../../utils";
import { Types } from "../../entity/type/type.entity";

@Injectable()
export class TypeService {
    constructor(
        @InjectRepository(Types)
        private readonly typeRepository: Repository<Types>,
    ) { }

    // Create
    async create(type: Partial<Types>): Promise<Types> {
        const result = this.typeRepository.create(type)
        return await this.typeRepository.save(result);
    }

    // Get
    async findAll(page: number = 1, limit: number = 10, query: { brand_id?: number, status?: number, search?: string }): Promise<{ total_items: number, items: Types[] }> {
        const [items, total_items] = await this.typeRepository.findAndCount({
            where: {
                ...query.status && { status: query.status },
                ...query.brand_id && { brand_id: query.brand_id },
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

    // Get
    async findOne(uuid: string): Promise<Types> {
        return await this.typeRepository.findOne({ where: { uuid } as FindOptionsWhere<Types> });
    }

    // Update
    async update(uuid: string, type: Partial<Types>): Promise<Types> {
        const updatedAt = new Date()
        await this.typeRepository.update(uuid, { ...type, updated_at: updatedAt });
        return this.findOne(uuid);
    }

    // Delete
    async delete(uuid: string): Promise<{ message: string }> {
        const existData = await this.typeRepository.findOne({
            where: {
                deleted_at: null,
                uuid: uuid,
            }
        })
        if (existData) {
            await this.typeRepository.softDelete(uuid);
            return { message: "Data Berhasil Dihapus!" };
        } else {
            throw new BadRequestException('Data tidak terdaftar!')
        }
    }
}