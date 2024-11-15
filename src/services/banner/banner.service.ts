import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Banners } from "src/entity/banner/banner.entity";
import { FindOptionsWhere, Like, Repository } from "typeorm";

@Injectable()
export class BannerService {
    constructor(
        @InjectRepository(Banners)
        private readonly bannerRepository: Repository<Banners>,
    ) { }

    // Create
    async create(banner: Partial<Banners>): Promise<Banners> {
        const result = this.bannerRepository.create(banner)
        return await this.bannerRepository.save(result);
    }

    // Get
    async findAll(page: number = 1, limit: number = 10, query: { status?: number, search?: string }): Promise<{ total_items: number, items: Banners[] }> {
        const [items, total_items] = await this.bannerRepository.findAndCount({
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
    async findOne(uuid: string): Promise<Banners> {
        return await this.bannerRepository.findOne({ where: { uuid } as FindOptionsWhere<Banners> });
    }

    // Update
    async update(uuid: string, banner: Partial<Banners>): Promise<Banners> {
        const updatedAt = new Date()
        await this.bannerRepository.update(uuid, { ...banner, updated_at: updatedAt });
        return this.findOne(uuid);
    }

    // Delete
    async delete(uuid: string): Promise<{ message: string }> {
        const existData = await this.bannerRepository.findOne({
            where: {
                deleted_at: null,
                uuid: uuid,
            }
        })
        if (existData) {
            await this.bannerRepository.softDelete(uuid);
            return { message: "Data Berhasil Dihapus!" };
        } else {
            throw new BadRequestException('Data tidak terdaftar!')
        }
    }
}