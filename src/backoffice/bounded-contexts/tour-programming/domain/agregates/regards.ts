import { AggregateRoot } from '@nestjs/cqrs';
import { UuidVO } from '../value-objects/uuid.vo';
import { NumberVO } from '../value-objects/number.vo';
import { RegardDeletedEvent } from '../events/regard-deleted';
import { RegardUpdatedEvent } from '../events/regard-updated';

export type RegardEsssential = {
    readonly regardId: UuidVO;
    readonly programmingId: UuidVO;
    readonly date: Date;
    readonly duration: NumberVO;
}

export type RegardUpdate = Partial<
    Omit<RegardEsssential, 'regardId' | 'programmingId' | 'duration'>
    & { duration: number }
>

export type RegardProperties = Required<RegardEsssential>

export class Regard extends AggregateRoot {
    private readonly regardId: UuidVO;
    private readonly programmingId: UuidVO;
    private date: Date;
    private duration: NumberVO;
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
            duration: this.duration,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        }
    }

    update(fields: RegardUpdate) {

        Object.assign(this, fields)
        this.updatedAt = new Date();
        const durationResult = NumberVO.create(fields.duration);
        if (durationResult.isOk()) {
            this.duration = durationResult.value;
        }

        this.apply(Object.assign(new RegardUpdatedEvent(), this.properties()));
    }

    delete() {
        this.active = false;
        this.deletedAt = new Date()

        this.apply(Object.assign(new RegardDeletedEvent(), this.properties()));
    }

}