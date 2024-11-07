import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsString, Length } from "class-validator"
import { v4 as uuidv4 } from "uuid"
@Entity()
export class Brands {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @IsString()
    @Length(1, 100)
    @Column()
    name: string;

    @Column()
    logo: string;

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