import { AggregateRoot } from '@nestjs/cqrs';
import { ProgrammingVO } from '../value-objects/programming-id.vo';

export type ProgrammingEssential = {
    readonly programmingId: ProgrammingVO;
    readonly tourId: string;
    readonly description: string;
    readonly date: Date;
}

export type ProgrammingOptional = {
    readonly duration: string;
    readonly active: boolean;
}

export type ProgrammingUpdate = {
    readonly date: Date;
    readonly description: string;
    readonly duration: string;
}

export type ProgrammingProperties = Required<ProgrammingEssential> & Partial<ProgrammingOptional>;

export class Programming extends AggregateRoot {
    private readonly programmingId: ProgrammingVO;
    private readonly tourId: string;
    private date: Date;
    private description: string;
    private duration: string;
    private active: boolean;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private deletedAt: Date;

    constructor(properties: ProgrammingProperties) {
        super();
        Object.assign(this, properties);
        this.createdAt = new Date();
        this.active = true;
    }

    properties() {
        return {
            programmingId: this.programmingId,
            tourId: this.tourId,
            date: this.date,
            description: this.description,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            duration: this.duration
        }
    }


    update(tourToUpdate: Partial<ProgrammingUpdate>) {
        Object.assign(this, tourToUpdate);
        this.updatedAt = new Date();
    }

    delete() {
        this.active = false;
        this.deletedAt = new Date();
    }

}