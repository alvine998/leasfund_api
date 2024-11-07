import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Like, Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { generateRandomString } from "src/utils";
import { Products } from "src/entity/product/product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
    ) { }

    // Create
    async create(product: Partial<Products>): Promise<Products> {
        const existData = await this.productRepository.findOne({
            where: {
                deleted_at: null,
                code: product.code,
            }
        })
        if (existData) {
            throw new BadRequestException('Kode sudah terdaftar!')
        }
        const result = this.productRepository.create(product)
        return await this.productRepository.save(result);
    }

    // Get
    async findAll(page: number = 1, limit: number = 10, query: { code?: string, search?: string }): Promise<{ total_items: number, items: Products[] }> {
        const [items, total_items] = await this.productRepository.findAndCount({
            where: {
                ...query.code && { code: query.code },
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
    async findOne(uuid: string): Promise<Products> {
        return await this.productRepository.findOne({ where: { uuid } as FindOptionsWhere<Products> });
    }

    // Update
    async update(uuid: string, product: Partial<Products>): Promise<Products> {
        const updatedAt = new Date()
        await this.productRepository.update(uuid, { ...product, updated_at: updatedAt });
        return this.findOne(uuid);
    }

    // Delete
    async delete(uuid: string): Promise<void> {
        await this.productRepository.softDelete(uuid)
    }
}