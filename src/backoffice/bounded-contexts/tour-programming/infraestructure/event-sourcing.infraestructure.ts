import { EventSourcing } from "../domain/entities/regard-sourcing";
import { EventourcingRepository } from "../domain/repositories/event-sourcing.repository";
import { EventSourcingModel } from './models/event-sourcing';

export class EventSourcingInfraestructure implements EventourcingRepository {
    async save(event: EventSourcing): Promise<void> {
        await EventSourcingModel.create(event);
    }

    async list(): Promise<any[]> {
        return await EventSourcingModel.find({ sort: { timestamp: 1 } });
    }
}