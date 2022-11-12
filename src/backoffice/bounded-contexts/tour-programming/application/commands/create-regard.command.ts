import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { v4 as uuidv4 } from 'uuid';
import { InternalServerErrorException, BadRequestException, Inject } from '@nestjs/common';
import { RegardInfraestructure } from '../../infraestructure/regard.infraestructure';
import { RegardRepository } from "../../domain/repositories/regard.repository";
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { RegardsFactory } from '../../domain/agregates/regards-factory';
import { RegardCreateResponse, RegardResponse } from "../dtos/regard-response.dto";
import { NumberVO } from '../../domain/value-objects/number.vo';

export class CreateRegardCommand implements ICommand {
    constructor(
        public readonly programmingId: string,
        public readonly date: Date,
        public readonly duration: number
    ) { }
}

@CommandHandler(CreateRegardCommand)
export class CreateRegardCommandHandler implements ICommandHandler<CreateRegardCommand, RegardCreateResponse> {

    constructor(
        @Inject(RegardInfraestructure) private repository: RegardRepository,
        private readonly regarFactory: RegardsFactory
    ) { }

    async execute(command: CreateRegardCommand): Promise<any> {
        const { programmingId, date, duration } = command;

        const programmingIdResult = UuidVO.create(programmingId);

        if (programmingIdResult.isErr()) {
            throw new BadRequestException(programmingIdResult.error.message, programmingIdResult.error.name);
        }

        const durationIdResult = NumberVO.create(duration);
        if (durationIdResult.isErr()) {
            throw new BadRequestException(durationIdResult.error.message, durationIdResult.error.name);
        }

        const RegardIdResult = UuidVO.create(uuidv4());

        if (RegardIdResult.isErr()) {
            throw new InternalServerErrorException(RegardIdResult.error.message, RegardIdResult.error.name);
        }

        const regardId = RegardIdResult.value;

        const RegardResult = this.regarFactory.create(regardId, programmingIdResult.value, date, durationIdResult.value);

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

        RegardResult.value.commit();

        return RegardResponse.fromDomainToResponse(RegardCreateResult.value);
    }
}