import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsString, Length } from "class-validator"
import { v4 as uuidv4 } from "uuid"
@Entity()
export class Products {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @IsString()
    @Length(1, 100)
    @Column()
    name: string;

    @IsString()
    @Length(1, 100)
    @Column()
    code: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    logo: string;

    @Column()
    types: string;

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