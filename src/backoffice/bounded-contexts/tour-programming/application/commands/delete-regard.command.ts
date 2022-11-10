import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { RegardInfraestructure } from '../../infraestructure/Regard.infraestructure';
import { RegardRepository } from '../../domain/repositories/Regard.repository';


export class DeleteRegardCommand implements ICommand {
    constructor(public readonly regardId: string) { }
}

@CommandHandler(DeleteRegardCommand)
export class DeleteRegardCommandHandler implements ICommandHandler<DeleteRegardCommand, void> {

    constructor(@Inject(RegardInfraestructure) private repository: RegardRepository) { }

    async execute(command: DeleteRegardCommand): Promise<void> {
        const regardIdResult = UuidVO.create(command.regardId);

        if (regardIdResult.isErr()) {
            throw new BadRequestException(
                regardIdResult.error.message,
                regardIdResult.error.name
            );
        }

        const programmingId = regardIdResult.value;

        const findProgrammingResult = await this.repository.findById(programmingId.value);

        if (findProgrammingResult.isErr()) {
            throw new InternalServerErrorException(findProgrammingResult.error.message, findProgrammingResult.error.name);
        }

        const regard = findProgrammingResult.value;
        regard.delete();

        await this.repository.save(regard);

        return null;
    }
}