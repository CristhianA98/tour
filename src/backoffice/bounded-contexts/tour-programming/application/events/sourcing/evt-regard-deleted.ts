import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Inject } from '@nestjs/common';
import { EventSourcing } from "../../../domain/entities/regard-sourcing";
import { EventourcingRepository } from "../../../domain/repositories/event-sourcing.repository";
import { EventSourcingInfraestructure } from '../../../infraestructure/event-sourcing.infraestructure';
import { RegardDeletedEvent } from '../../../domain/events/regard-deleted';

@EventsHandler(RegardDeletedEvent)
export class EventSourcingRegardDeletedHandler implements IEventHandler<RegardDeletedEvent>{

    constructor(@Inject(EventSourcingInfraestructure) private readonly repository: EventourcingRepository) { }

    async handle(event: RegardDeletedEvent) {
        const eventSourcing = new EventSourcing(
            event.regardId.value,
            "Regard",
            "Deleted",
            {
            },
        );

        await this.repository.save(eventSourcing);
    }

}