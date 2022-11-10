import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { v4 as uuidv4 } from 'uuid';
import { InternalServerErrorException, BadRequestException, Inject } from '@nestjs/common';
import { RegardInfraestructure } from '../../infraestructure/Regard.infraestructure';
import { RegardRepository } from "../../domain/repositories/Regard.repository";
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { RegardsFactory } from '../../domain/agregates/regards-factory';
import { RegardCreateResponse, RegardResponse } from "../dtos/regard-response.dto";

export class CreateRegardCommand implements ICommand {
    constructor(
        public readonly programmingId: string,
        public readonly date: Date
    ) { }
}

@CommandHandler(CreateRegardCommand)
export class CreateRegardCommandHandler implements ICommandHandler<CreateRegardCommand, RegardCreateResponse> {

    constructor(@Inject(RegardInfraestructure) private repository: RegardRepository) { }

    async execute(command: CreateRegardCommand): Promise<any> {
        const { programmingId, date } = command;

        const programmingIdResult = UuidVO.create(programmingId);

        if (programmingIdResult.isErr()) {
            throw new BadRequestException(programmingIdResult.error.message, programmingIdResult.error.name);
        }

        const RegardIdResult = UuidVO.create(uuidv4());

        if (RegardIdResult.isErr()) {
            throw new InternalServerErrorException(RegardIdResult.error.message, RegardIdResult.error.name);
        }

        const regardId = RegardIdResult.value;

        const RegardResult = new RegardsFactory().create(regardId, programmingIdResult.value, date);

        if (RegardResult.isErr()) {
            throw new BadRequestException(
                RegardResult.error.message,
                RegardResult.error.name
            );
        }

        const RegardCreateResult = await this.repository.save(RegardResult.value);
        if (RegardCreateResult.isErr()) {
            throw new InternalServerErrorException(
                RegardCreateResult.error.message,
                RegardCreateResult.error.name
            );
        }

        return RegardResponse.fromDomainToResponse(RegardCreateResult.value);
    }
}