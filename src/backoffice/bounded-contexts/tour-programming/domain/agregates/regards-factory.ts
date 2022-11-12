import { Inject, InternalServerErrorException } from '@nestjs/common';
import { Result, ok, err } from 'neverthrow';
import { DateNotEmptyException } from '../exceptions/date';
import { UuidVO } from '../value-objects/uuid.vo';
import { Regard, RegardProperties } from './regards';
import { NumberVO } from '../value-objects/number.vo';
import { EventPublisher } from '@nestjs/cqrs';
import { RegardCreatedEvent } from '../events/regard-created';

export type RegardsFactoryResult = Result<
    Regard,
    DateNotEmptyException
>

export class RegardsFactory {

    constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) { }

    create(regardId: UuidVO, programmingId: UuidVO, date: Date, duration: NumberVO): RegardsFactoryResult {

        if (!date) return err(new DateNotEmptyException())


        const regard = new Regard({
            regardId,
            duration,
            programmingId,
            date
        })

        this.eventPublisher.mergeObjectContext(regard)


        const event = new RegardCreatedEvent();
        event.date = regard.properties().date;
        event.duration = regard.properties().duration;
        event.programmingId = regard.properties().programmingId;
        event.regardId = regard.properties().regardId;


        regard.apply(event)

        return ok(regard);
    }

    reconstitute(properties: RegardProperties): Regard {
        return this.eventPublisher.mergeObjectContext(new Regard(properties)) as Regard
    }
}