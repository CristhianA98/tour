import { AggregateRoot } from '@nestjs/cqrs';

export type TourEssential = {
    readonly tourId: string;
    readonly name: string;
    readonly description: string;
}

export type TourOptional = {
    readonly image: string;
}

export type TourUpdate = {
    readonly name: string;
    readonly description: string;
    readonly image: string;
}

export type TourProperties = Required<TourEssential> & Partial<TourOptional>;

export class Tour extends AggregateRoot {
    private readonly tourId: string;
    private name: string;
    private description: string;
    private image: string;
    private active: boolean;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private deletedAt: Date;

    constructor(properties: TourProperties) {
        super();
        Object.assign(this, properties);
        this.createdAt = new Date();
        this.active = true;
    }

    properties() {
        return {
            tourId: this.tourId,
            name: this.name,
            description: this.description,
            image: this.image,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        }
    }

    update(tourToUpdate: Partial<TourUpdate>) {
        Object.assign(this, tourToUpdate);
        this.updatedAt = new Date();
    }

    delete() {
        this.active = false;
        this.deletedAt = new Date();
    }

}