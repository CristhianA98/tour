import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { v4 as uuidv4 } from 'uuid';
import { ProgrammingVO } from '../../value-objects/programming-id.vo';
import { ProggramingFactory } from '../../domain/agregates/programming-factory';
import { InternalServerErrorException, BadRequestException, Inject } from '@nestjs/common';
import { tourVO } from '../../value-objects/tour-id.vo';
import { ProgrammingInfraestructure } from '../../infraestructure/programming.infraestructure';
import { ProgrammingRepository } from "../../domain/repositories/programming.repository";
import { ProgrammingCreateResponse, ProgrammingResponse } from '../dtos/programming-response.dto';

export class CreateProgrammingCommand implements ICommand {
    constructor(
        public readonly tourId: string,
        public readonly description: string,
        public readonly date: Date
    ) { }
}

@CommandHandler(CreateProgrammingCommand)
export class CreateProggramingCommandHandler implements ICommandHandler<CreateProgrammingCommand, ProgrammingCreateResponse> {

    constructor(@Inject(ProgrammingInfraestructure) private repository: ProgrammingRepository) { }

    async execute(command: CreateProgrammingCommand): Promise<any> {
        const { tourId, description, date } = command;

        const tourIdResult = tourVO.create(tourId);

        if (tourIdResult.isErr()) {
            throw new BadRequestException(tourIdResult.error.message, tourIdResult.error.name);
        }

        const programmingIdResult = ProgrammingVO.create(uuidv4());

        if (programmingIdResult.isErr()) {
            throw new InternalServerErrorException(programmingIdResult.error.message, programmingIdResult.error.name);
        }

        const programmingId = programmingIdResult.value;

        const programmingResult = new ProggramingFactory().create(programmingId, tourId, description, date);

        if (programmingResult.isErr()) {
            throw new BadRequestException(
                programmingResult.error.message,
                programmingResult.error.name
            );
        }

        const programmingCreateResult = await this.repository.save(programmingResult.value);
        if (programmingCreateResult.isErr()) {
            throw new InternalServerErrorException(
                programmingCreateResult.error.message,
                programmingCreateResult.error.name
            );
        }

        return ProgrammingResponse.fromDomainToResponse(programmingCreateResult.value);
    }
}