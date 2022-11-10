import { BadRequestException, InternalServerErrorException, Inject } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { RegardRepository } from '../../domain/repositories/Regard.repository';
import { RegardInfraestructure } from '../../infraestructure/Regard.infraestructure';

export class UpdateRegardCommand implements ICommand {
    constructor(
        public readonly regardId: string,
        public readonly date: Date
    ) { }
}

@CommandHandler(UpdateRegardCommand)
export class UpdateRegardCommandHandler implements ICommandHandler<UpdateRegardCommand, void>{

    constructor(@Inject(RegardInfraestructure) private repository: RegardRepository) { }

    async execute(command: UpdateRegardCommand): Promise<void> {
        const regardIdResult = UuidVO.create(command.regardId);

        if (regardIdResult.isErr()) {
            throw new BadRequestException(regardIdResult.error.message, regardIdResult.error.name);
        }

        const findRegardResult = await this.repository.findById(regardIdResult.value.value);

        if (findRegardResult.isErr()) {
            throw new InternalServerErrorException(findRegardResult.error.message, findRegardResult.error.name);
        }

        const regard = findRegardResult.value;
        regard.update({
            date: command.date
        })

        await this.repository.save(regard);

        return null;
    }
}