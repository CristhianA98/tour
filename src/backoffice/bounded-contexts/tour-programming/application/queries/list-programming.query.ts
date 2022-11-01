import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject, BadRequestException } from '@nestjs/common';
import { ProgrammingInfraestructure } from '../../infraestructure/programming.infraestructure';
import { ProgrammingVO } from '../../value-objects/programming-id.vo';
import { tourVO } from '../../value-objects/tour-id.vo';
import { ProgrammingRepository } from "../../domain/repositories/programming.repository";
import { ProgrammingListResult } from '../dtos/programming-list-result.dto';

export class ListProgrammingQuery implements IQuery {
    constructor(public readonly tourId: string) { }
}

@QueryHandler(ListProgrammingQuery)
export class ListProgrammingQueryHandler implements IQueryHandler<ListProgrammingQuery, ProgrammingListResult[]>{
    constructor(
        @Inject(ProgrammingInfraestructure) private repository: ProgrammingRepository
    ) { }

    async execute(query: ListProgrammingQuery): Promise<ProgrammingListResult[]> {
        const tourIdResult = tourVO.create(query.tourId)

        if (tourIdResult.isErr()) {
            throw new BadRequestException(
                tourIdResult.error.message,
                tourIdResult.error.name
            )
        }

        const tourId = tourIdResult.value;

        const programmingResult = await this.repository.listByTourId(tourId.value);

        if (programmingResult.isErr()) {
            throw new BadRequestException(
                programmingResult.error.message,
                programmingResult.error.name
            )
        }


        return programmingResult.value;

    }
}