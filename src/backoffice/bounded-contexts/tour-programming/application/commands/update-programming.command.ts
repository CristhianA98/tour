import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Programming } from '../../domain/agregates/programming';
import { ProgrammingVO } from '../../value-objects/programming-id.vo';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export class UpdateProgrammingCommand implements ICommand {
    constructor(
        public readonly programmingId: string,
        public readonly date: Date,
        public readonly description: string,
        public readonly duration: string
    ) { }
}

@CommandHandler(UpdateProgrammingCommand)
export class UpdateProgrammingCommandHandler implements ICommandHandler<UpdateProgrammingCommand, any>{

    private findProgrammingById(programmingId: string): Programming {

        const programmingIdResult = ProgrammingVO.create(programmingId);

        if(programmingIdResult.isErr()){
            throw new BadRequestException(programmingIdResult.error.message); 
        }

        const programmingVo = programmingIdResult.value;

        return new Programming({
            programmingId: programmingVo,
            tourId: '32460671-7431-4d36-bea7-688297a276a1',
            description: "Descripcion de tour",
            date: new Date('02-02-2020')
        });
    }

    execute(command: UpdateProgrammingCommand): Promise<any> {
        console.log(command);
        const proggraming = this.findProgrammingById(command.programmingId);
        proggraming.update({
            description: command.description,
            duration: command.duration
        })
        return Promise.resolve();
    }
}