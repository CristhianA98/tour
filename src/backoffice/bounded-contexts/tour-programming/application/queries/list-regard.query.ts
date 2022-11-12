import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject, BadRequestException } from '@nestjs/common';
import { RegardListResult } from '../dtos/regard-list-result.dto';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { RegardsFactory } from '../../domain/agregates/regards-factory';
import { RegardRepository } from "../../domain/repositories/regard.repository";
import { RegardInfraestructure } from "../../infraestructure/regard.infraestructure";

export class ListRegardQuery implements IQuery {
    constructor(public readonly programmingId: string) { }
}

@QueryHandler(ListRegardQuery)
export class ListRegardQueryHandler implements IQueryHandler<ListRegardQuery, RegardListResult[]>{
    constructor(
        @Inject(RegardInfraestructure) private repository: RegardRepository
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

        return programmingResult.value;

    }
}