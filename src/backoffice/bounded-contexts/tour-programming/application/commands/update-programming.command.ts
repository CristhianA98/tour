import { ProgrammingVO } from '../../domain/value-objects/programming-id.vo';
import { BadRequestException, InternalServerErrorException, Inject } from '@nestjs/common';
import { ProgrammingInfraestructure } from '../../infraestructure/programming.infraestructure';
import { ProgrammingRepository } from '../../domain/repositories/programming.repository';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class UpdateProgrammingCommand implements ICommand {
    constructor(
        public readonly programmingId: string,
        public readonly date: Date,
        public readonly description: string,
        public readonly duration: string
    ) { }
}

@CommandHandler(UpdateProgrammingCommand)
export class UpdateProgrammingCommandHandler implements ICommandHandler<UpdateProgrammingCommand, void>{
    constructor(@Inject(ProgrammingInfraestructure) private repository: ProgrammingRepository) { }

    async execute(command: UpdateProgrammingCommand): Promise<void> {
        const programmingIdResult = ProgrammingVO.create(command.programmingId);

        if (programmingIdResult.isErr()) {
            throw new BadRequestException(programmingIdResult.error.message, programmingIdResult.error.name);
        }

        const findProgrammingResult = await this.repository.findById(programmingIdResult.value.value);

        if (findProgrammingResult.isErr()) {
            throw new InternalServerErrorException(findProgrammingResult.error.message, findProgrammingResult.error.name);
        }

        const proggraming = findProgrammingResult.value;
        proggraming.update({
            description: command.description,
            duration: command.duration
            
        })
        await this.repository.save(proggraming);

        return null;
    }
}