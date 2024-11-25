import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid"
@Entity()
export class Transactions {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    user_uuid: string;

    @Column()
    user_name: string;

    @Column()
    customer_uuid: string;

    @Column()
    customer_name: string;

    @Column({ nullable: true })
    brand: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    year: number;

    @Column({ nullable: true })
    bpkb: string;

    @Column({ nullable: true })
    loan_amount: number;

    @Column({ nullable: true })
    tenor: number;

    @Column({ nullable: true })
    tax_status: string;

    @Column({ nullable: true })
    tax_plat_status: string;

    @Column({ unique: true })
    plat_no: string;

    @Column({ nullable: true })
    remarks: string;

    @Column({ default: 1 })
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