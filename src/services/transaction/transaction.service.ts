import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactions } from "src/entity/transaction/transaction.entity";
import { Between, FindOptionsWhere, Like, Repository } from "typeorm";

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transactions)
        private readonly transactionRepository: Repository<Transactions>
    ) { }

    // Create user
    async create(transaction: Partial<Transactions>): Promise<Transactions> {

        const existData = await this.transactionRepository.findOne({
            where: [{
                deleted_at: null,
                plat_no: transaction.plat_no,
            }]
        })
        if (existData) {
            throw new BadRequestException('Plat Nomor sudah terdaftar!')
        }
        const result = this.transactionRepository.create(transaction)
        return await this.transactionRepository.save(result);
    }

    // Get Users
    async findAll(page: number = 1, limit: number = 10, query: { status?: number, plat_no?: string, user_uuid?: string, customer_uuid?: string, brand?: string, year?: number, bpkb?: string, tenor?: number, loan_amount?: number, search?: string, date_start?: Date, date_end?: Date }): Promise<{ total_items: number, items: Transactions[] }> {
        const [items, total_items] = await this.transactionRepository.findAndCount({
            where: {
                ...query.customer_uuid && { customer_uuid: query.customer_uuid },
                ...query.plat_no && { plat_no: query.plat_no },
                ...query.status && { status: query.status },
                ...query.user_uuid && { user_uuid: query.user_uuid },
                ...query.brand && { brand: query.brand },
                ...query.bpkb && { bpkb: query.bpkb },
                ...query.tenor && { tenor: query.tenor },
                ...query.loan_amount && { loan_amount: query.loan_amount },
                ...query.date_start && query.date_end && { created_at: Between(query.date_start, query.date_end) },
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
    async findOne(uuid: string): Promise<Transactions> {
        return await this.transactionRepository.findOne({ where: { uuid } as FindOptionsWhere<Transactions> });
    }

    // Update User
    async update(uuid: string, transaction: Partial<Transactions>): Promise<Transactions> {
        const updatedAt = new Date()
        await this, this.transactionRepository.update(uuid, { ...transaction, updated_at: updatedAt });
        return this.findOne(uuid);
    }

    // Delete user
    async delete(uuid: string): Promise<{ message: string }> {
        const existData = await this.transactionRepository.findOne({
            where: {
                deleted_at: null,
                uuid: uuid,
            }
        })
        if (existData) {
            await this.transactionRepository.softDelete(uuid)
            return { message: "Data Berhasil Dihapus!" };
        } else {
            throw new BadRequestException('Data tidak terdaftar!')
        }
    }
}