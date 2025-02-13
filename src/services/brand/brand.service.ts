import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brands } from "../../entity/brand/brand.entity";
import { FindOptionsWhere, Like, Repository } from "typeorm";

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brands)
        private readonly brandRepository: Repository<Brands>,
    ) { }

    // Create
    async create(brand: Partial<Brands>): Promise<Brands> {
        const result = this.brandRepository.create(brand)
        return await this.brandRepository.save(result);
    }

    // Get
    async findAll(page: number = 1, limit: number = 10, query: { status?: number, search?: string }): Promise<{ total_items: number, items: Brands[] }> {
        const [items, total_items] = await this.brandRepository.findAndCount({
            where: {
                ...query.status && { status: query.status },
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
    async findOne(uuid: string): Promise<Brands> {
        return await this.brandRepository.findOne({ where: { uuid } as FindOptionsWhere<Brands> });
    }

    // Update
    async update(uuid: string, brand: Partial<Brands>): Promise<Brands> {
        const updatedAt = new Date()
        await this.brandRepository.update(uuid, { ...brand, updated_at: updatedAt });
        return this.findOne(uuid);
    }

    // Delete
    async delete(uuid: string): Promise<{ message: string }> {
        const existData = await this.brandRepository.findOne({
            where: {
                deleted_at: null,
                uuid: uuid,
            }
        })
        if (existData) {
            await this.brandRepository.softDelete(uuid);
            return { message: "Data Berhasil Dihapus!" };
        } else {
            throw new BadRequestException('Data tidak terdaftar!')
        }
    }
}