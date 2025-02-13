import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../entity/user/user.entity";
import { FindOptionsWhere, Like, Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { generateOtp, generateRandomString } from "../../utils";
import { EmailService } from "../mail/mail.service"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        private readonly emailService: EmailService,
    ) { }

    // Create user
    async create(user: Partial<Users>): Promise<Users> {
        // const saltRounds = 10;
        // user.password = await bcrypt.hash(user.password, saltRounds);
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
    async findAll(page: number = 1, limit: number = 10, query: { email?: string, phone?: string, search?: string, following_referral_code?: string, status?: number }): Promise<{ total_items: number, items: Users[] }> {
        const [items, total_items] = await this.userRepository.findAndCount({
            where: {
                ...query.email && { email: query.email },
                ...query.phone && { phone: query.phone },
                ...query.status && { status: query.status },
                ...query.following_referral_code && { following_referral_code: query.following_referral_code },
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

    // Login User
    async loginOTP(email: string, updateData: Partial<Users>): Promise<Users> {
        // Find user by email
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('User not found'); // Handle case where the user does not exist
        }

        const otp = generateOtp();
        await this.emailService.sendOtpEmail(email, otp);

        // Update user fields
        const updatedUser = Object.assign(user, { ...updateData, otp: otp });

        // Save the updated user back to the database
        return this.userRepository.save(updatedUser);
    }

    // Login User
    async confirmOTP(otp: string, updateData: Partial<Users>): Promise<Users> {
        // Find user by email
        const user = await this.userRepository.findOne({ where: { otp: otp, email: updateData?.email, deleted_at: null } });

        if (!user) {
            throw new Error('User not found'); // Handle case where the user does not exist
        }

        if (user) {
            const updatedUser = Object.assign(user, { ...updateData, otp: null });

            // Save the updated user back to the database
            return this.userRepository.save(updatedUser);
        }
    }
}