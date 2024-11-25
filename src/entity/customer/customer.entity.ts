import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsString, Length } from "class-validator"
import { v4 as uuidv4 } from "uuid"

export enum MarriedStatus {
    married = 'married',
    single = 'single',
    divorce = 'divorce'
}

export enum HouseStatus {
    self = 'self',
    rent = 'rent',
    mess = 'mess'
}


@Entity()
export class Customers {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @IsString()
    @Length(1, 100)
    @Column()
    name: string;

    @Column()
    mother_name: string;

    @Column({ nullable: true })
    couple_name: string;

    @Column({ nullable: true })
    relation_name: string;

    @Column({ nullable: true })
    relation_type: string;

    @Column({ nullable: true })
    relation_address: string;

    @Length(1, 16)
    @Column()
    nik: number;

    @Column({ nullable: true })
    ktp: string;

    @Column({ nullable: true })
    kk: string;

    @Column({ nullable: true })
    couple_ktp: string;

    @Column({ nullable: true })
    akta: string;

    @Length(1, 13)
    @Column()
    phone: string;

    @Length(1, 13)
    @Column({ nullable: true })
    couple_phone: string;

    @Length(1, 13)
    @Column({ nullable: true })
    emergency_phone: string;

    @Column()
    ktp_address: string;

    @Column()
    address: string;

    @Column()
    occupation: string;

    @Column({ nullable: true })
    couple_occupation: string;

    @Column({
        type: "enum",
        enum: MarriedStatus,
        default: MarriedStatus.married
    })
    marriage_status: MarriedStatus;

    @Column({
        type: "enum",
        enum: HouseStatus,
        default: HouseStatus.self
    })
    house_status: HouseStatus;

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