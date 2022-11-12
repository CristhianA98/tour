import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RegardCreatedEvent } from "../../domain/events/regard-created";
import { ProgrammingInfraestructure } from '../../infraestructure/programming.infraestructure';
import { ProgrammingRepository } from "../../domain/repositories/programming.repository";

@EventsHandler(RegardCreatedEvent)
export class RegardCreatedHandler implements IEventHandler<RegardCreatedEvent>{

    constructor(@Inject(ProgrammingInfraestructure) private repositoryProgramming: ProgrammingRepository) { }

    async handle(event: RegardCreatedEvent) {

        const programmingResult = await this.repositoryProgramming.findById(event.programmingId.value);

        if (programmingResult.isErr()) {
            throw new InternalServerErrorException(
                programmingResult.error.message,
                programmingResult.error.name
            );
        }

        const programming = programmingResult.value;
        const totalHours = programming.properties().totalHours + event.duration.value;
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