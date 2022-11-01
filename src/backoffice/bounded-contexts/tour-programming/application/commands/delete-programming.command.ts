import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ProgrammingVO } from '../../value-objects/programming-id.vo';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { ProgrammingInfraestructure } from '../../infraestructure/programming.infraestructure';
import { ProgrammingRepository } from '../../domain/repositories/programming.repository';


export class DeleteProgrammingCommand implements ICommand {
    constructor(public readonly programmingId: string) { }
}

@CommandHandler(DeleteProgrammingCommand)
export class DeleteProgrammingCommandHandler implements ICommandHandler<DeleteProgrammingCommand, void> {

    constructor(@Inject(ProgrammingInfraestructure) private repository: ProgrammingRepository) { }

    async execute(command: DeleteProgrammingCommand): Promise<void> {
        const programmingIdResult = ProgrammingVO.create(command.programmingId);

        if (programmingIdResult.isErr()) {
            throw new BadRequestException(
                programmingIdResult.error.message,
                programmingIdResult.error.name
            );
        }

        const programmingId = programmingIdResult.value;

        const findProgrammingResult = await this.repository.findById(programmingId.value);

        if (findProgrammingResult.isErr()) {
            throw new InternalServerErrorException(findProgrammingResult.error.message, findProgrammingResult.error.name);
        }

        const programming = findProgrammingResult.value;
        programming.delete();

        await this.repository.save(programming);

        return null;
    }
}