import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Like, Repository } from "typeorm";
import { Customers, HouseStatus, MarriedStatus } from "src/entity/customer/customer.entity";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customers)
        private readonly userRepository: Repository<Customers>
    ) { }

    // Create user
    async create(customer: Partial<Customers>): Promise<Customers> {
        // const saltRounds = 10;
        // user.password = await bcrypt.hash(user.password, saltRounds);

        const existData = await this.userRepository.findOne({
            where: [{
                deleted_at: null,
                phone: customer.phone,
            }]
        })
        if (existData) {
            throw new BadRequestException('No Telepon sudah terdaftar!')
        }
        const result = this.userRepository.create(customer)
        return await this.userRepository.save(result);
    }

    // Get Users
    async findAll(page: number = 1, limit: number = 10, query: { status?: number, marriage_status?: MarriedStatus, house_status?: HouseStatus, user_uuid?: string, nik?: number, phone?: string, search?: string }): Promise<{ total_items: number, items: Customers[] }> {
        const [items, total_items] = await this.userRepository.findAndCount({
            where: {
                ...query.nik && { nik: query.nik },
                ...query.marriage_status && { marriage_status: query.marriage_status },
                ...query.status && { status: query.status },
                ...query.house_status && { house_status: query.house_status },
                ...query.user_uuid && { user_uuid: query.user_uuid },
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
    async findOne(uuid: string): Promise<Customers> {
        return await this.userRepository.findOne({ where: { uuid } as FindOptionsWhere<Customers> });
    }

    // Update User
    async update(uuid: string, user: Partial<Customers>): Promise<Customers> {
        const updatedAt = new Date()
        await this, this.userRepository.update(uuid, { ...user, updated_at: updatedAt });
        return this.findOne(uuid);
    }

    // Delete user
    async delete(uuid: string): Promise<{ message: string }> {
        const existData = await this.userRepository.findOne({
            where: {
                deleted_at: null,
                uuid: uuid,
            }
        })
        if (existData) {
            await this.userRepository.softDelete(uuid)
            return { message: "Data Berhasil Dihapus!" };
        } else {
            throw new BadRequestException('Data tidak terdaftar!')
        }
    }
}