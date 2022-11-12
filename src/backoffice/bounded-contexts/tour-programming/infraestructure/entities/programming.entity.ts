import { Entity, PrimaryColumn, Column } from 'typeorm';
import { BaseEntity } from './base';

@Entity({ name: 'programming' })
export class ProgrammingEntity extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    programmingId: string;

    @Column({ type: 'varchar', length: 36 })
    tourId: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: "boolean" })
    active: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    duration: string;

    @Column({ type: 'int', nullable: true })
    totalHours: number


}