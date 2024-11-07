import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsString, Length } from "class-validator"
import { v4 as uuidv4 } from "uuid"
@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @IsString()
    @Length(2, 100)
    @Column()
    name: string;

    @Column()
    phone: string;

    @IsEmail()
    @Column({ nullable: true, unique: true })
    email: string | null;

    @IsString()
    @Length(8, 100)
    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    referral_code: string;

    @Column()
    status: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;

    constructor() {
        this.uuid = uuidv4();
    }
}