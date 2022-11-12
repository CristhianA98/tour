import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ProgrammingInfraestructure } from '../../infraestructure/programming.infraestructure';
import { RegardUpdatedEvent } from "../../domain/events/regard-updated";
import { RegardInfraestructure } from '../../infraestructure/regard.infraestructure';
import { RegardRepository } from "../../domain/repositories/regard.repository";
import { ProgrammingRepository } from "../../domain/repositories/programming.repository";

@EventsHandler(RegardUpdatedEvent)
export class RegardUpdatedHandler implements IEventHandler<RegardUpdatedEvent>{

    constructor(
        @Inject(ProgrammingInfraestructure) private repositoryProgramming: ProgrammingRepository,
        @Inject(RegardInfraestructure) private repositoryRegard: RegardRepository
    ) { }

    async handle(event: RegardUpdatedEvent) {

        const regardResult = await this.repositoryRegard.listByProgrammingId(event.programmingId.value);
        if (regardResult.isErr()) {
            throw new InternalServerErrorException(
                regardResult.error.message,
                regardResult.error.name
            );
        }

        const regards = regardResult.value;
        const totalHours = regards.reduce((total, regard) => total + regard.duration, 0);

        const programmingResult = await this.repositoryProgramming.findById(event.programmingId.value);

        if (programmingResult.isErr()) {
            throw new InternalServerErrorException(
                programmingResult.error.message,
                programmingResult.error.name
            );
        }

        const programming = programmingResult.value;
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