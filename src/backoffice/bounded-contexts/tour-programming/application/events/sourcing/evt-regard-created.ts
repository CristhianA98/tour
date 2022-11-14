import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Inject } from '@nestjs/common';
import { RegardCreatedEvent } from '../../../domain/events/regard-created';
import { EventSourcing } from "../../../domain/entities/regard-sourcing";
import { EventourcingRepository } from "../../../domain/repositories/event-sourcing.repository";
import { EventSourcingInfraestructure } from '../../../infraestructure/event-sourcing.infraestructure';

@EventsHandler(RegardCreatedEvent)
export class EventSourcingRegardCreatedHandler implements IEventHandler<RegardCreatedEvent>{

    constructor(@Inject(EventSourcingInfraestructure) private readonly repository: EventourcingRepository) { }

    async handle(event: RegardCreatedEvent) {
        const eventSourcing = new EventSourcing(
            event.regardId.value,
            "Regard",
            "Created",
            {
                ...event,
                regardId: event.regardId.value,
                programmingId: event.programmingId.value,
                duration: event.duration.value
            },
        );

        await this.repository.save(eventSourcing);
    }

}