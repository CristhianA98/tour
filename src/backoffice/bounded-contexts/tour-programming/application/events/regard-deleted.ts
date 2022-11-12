import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ProgrammingInfraestructure } from '../../infraestructure/programming.infraestructure';
import { ProgrammingRepository } from "../../domain/repositories/programming.repository";
import { RegardDeletedEvent } from '../../domain/events/regard-deleted';

@EventsHandler(RegardDeletedEvent)
export class RegardDeletedHandler implements IEventHandler<RegardDeletedEvent>{

    constructor(@Inject(ProgrammingInfraestructure) private repositoryProgramming: ProgrammingRepository) { }

    async handle(event: RegardDeletedEvent) {

        const programmingResult = await this.repositoryProgramming.findById(event.programmingId.value);

        if (programmingResult.isErr()) {
            throw new InternalServerErrorException(
                programmingResult.error.message,
                programmingResult.error.name
            );
        }

        const programming = programmingResult.value;
        const totalHours = programming.properties().totalHours - event.duration.value;
        programming.update({ totalHours })

        const updateResult = await this.repositoryProgramming.save(programming);

        if (updateResult.isErr()) {
            throw new InternalServerErrorException(
                updateResult.error.message,
                updateResult.error.name
            );
        }



    }
}