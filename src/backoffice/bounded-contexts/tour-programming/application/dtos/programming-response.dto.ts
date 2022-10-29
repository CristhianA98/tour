import { Programming } from '../../domain/agregates/programming';

export interface ProgrammingCreateResponse {
    programmingId: string;
    tourId: string;
    description: string;
    date: Date;
}

export class ProgrammingResponse {
    static fromDomainToResponse(programming: Programming): ProgrammingCreateResponse {
        return {
            programmingId: programming.properties().programmingId.value,
            tourId: programming.properties().tourId,
            description: programming.properties().description,
            date: programming.properties().date
        }
    }
}