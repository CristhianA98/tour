import { Result, ok, err } from 'neverthrow';
import { DateNotEmptyException } from '../exceptions/date';
import { UuidVO } from '../value-objects/uuid.vo';
import { Regard } from './regards';

export type RegardsFactoryResult = Result<
    Regard,
    DateNotEmptyException
>

export class RegardsFactory {
    create(regardId: UuidVO, programmingId: UuidVO, date: Date): RegardsFactoryResult {

        if (!date) return err(new DateNotEmptyException())

        return ok(new Regard({
            regardId,
            programmingId,
            date
        }));
    }
}