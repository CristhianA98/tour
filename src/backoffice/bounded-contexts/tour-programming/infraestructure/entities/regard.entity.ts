import { Entity, PrimaryColumn, Column } from 'typeorm';
import { BaseEntity } from './base';

@Entity({ name: 'regard' })
export class RegardEntity extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    regardId: string;

    @Column({ type: 'varchar', length: 36 })
    programmingId: string;

    @Column({ type: 'datetime' })
    date: Date;

    @Column({ type: "boolean" })
    active: boolean;
}