import { EventSourcing } from "../entities/regard-sourcing";

export interface EventourcingRepository {
    save(event: EventSourcing): Promise<void>;
    list(): Promise<any[]>
}