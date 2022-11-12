import { IEvent } from "@nestjs/cqrs";
import { RegardProperties } from '../agregates/regards';
import { UuidVO } from "../value-objects/uuid.vo";
import { NumberVO } from '../value-objects/number.vo';

export class RegardCreatedEvent implements IEvent, RegardProperties {
    regardId: UuidVO;
    programmingId: UuidVO;
    date: Date;
    duration: NumberVO;
}