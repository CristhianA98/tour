import { AggregateRoot } from '@nestjs/cqrs';
import { UuidVO } from '../value-objects/uuid.vo';

export type RegardEsssential = {
    readonly regardId: UuidVO;
    readonly programmingId: UuidVO;
    readonly date: Date;
}

export type RegardUpdate = Partial<Omit<RegardEsssential, 'regardId,programmingId'>>

export type RegardProperties = Required<RegardEsssential>

export class Regard extends AggregateRoot {
    private readonly regardId: UuidVO;
    private readonly programmingId: UuidVO;
    private date: Date;
    private active: boolean;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private deletedAt: Date;

    constructor(properties: RegardProperties) {
        super()
        Object.assign(this, properties);
        this.createdAt = new Date();
        this.active = true;
    }

    properties() {
        return {
            regardId: this.regardId,
            programmingId: this.programmingId,
            date: this.date,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        }
    }

    update(fields: RegardUpdate) {
        Object.assign(this, fields)
        this.updatedAt = new Date();
    }

    delete() {
        this.active = false;
        this.deletedAt = new Date()
    }

}