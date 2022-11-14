import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { RegardListResult } from '../dtos/regard-list-result.dto';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { RegardsFactory } from '../../domain/agregates/regards-factory';
import { RegardRepository } from "../../domain/repositories/regard.repository";
import { RegardInfraestructure } from "../../infraestructure/regard.infraestructure";
import { EventSourcingInfraestructure } from '../../infraestructure/event-sourcing.infraestructure';
import { EventourcingRepository } from "../../domain/repositories/event-sourcing.repository";
import { RegardEsssential, Regard } from '../../domain/agregates/regards';

export class ListRegardQuery implements IQuery {
    constructor(public readonly programmingId: string) { }
}

@QueryHandler(ListRegardQuery)
export class ListRegardQueryHandler implements IQueryHandler<ListRegardQuery, RegardListResult[]>{
    constructor(
        @Inject(RegardInfraestructure) private repository: RegardRepository,
        @Inject(EventSourcingInfraestructure) private repositoryEventSourcing: EventourcingRepository
    ) { }

    async execute(query: ListRegardQuery): Promise<RegardListResult[]> {
        const programmingIdResult = UuidVO.create(query.programmingId)

        if (programmingIdResult.isErr()) {
            throw new BadRequestException(
                programmingIdResult.error.message,
                programmingIdResult.error.name
            )
        }

        const regardId = programmingIdResult.value;

        const programmingResult = await this.repository.listByProgrammingId(regardId.value);

        if (programmingResult.isErr()) {
            throw new BadRequestException(
                programmingResult.error.message,
                programmingResult.error.name
            )
        }

        const records = await this.repositoryEventSourcing.list();
        let objRecord;
        for (const record of records) {
            if (record.action == 'Created') {
                const properties: RegardEsssential = {
                    regardId: record.recordId,
                    programmingId: record.programmingId,
                    date: record.date,
                    duration: record.duration,
                }
                objRecord = new Regard(properties);
            } else if (record.action == 'Updated') {
                const result = await this.repository.findById(record.recordId);
                if (result.isErr()) {
                    throw new InternalServerErrorException(
                        result.error.message,
                        result.error.name
                    )
                }

                objRecord = result.value;
                objRecord.update(record.data);
            } else if (record.action == 'Deleted') {
                const result = await this.repository.findById(record.recordId);
                if (result.isErr()) {
                    throw new InternalServerErrorException(
                        result.error.message,
                        result.error.name
                    )
                }

                objRecord = result.value;
                objRecord.delete();
            }
        }

        console.log("Recostruido ", objRecord);

        return programmingResult.value;

    }
}