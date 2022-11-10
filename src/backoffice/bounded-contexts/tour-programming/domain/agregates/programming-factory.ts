import { ProgrammingVO } from '../value-objects/programming-id.vo';
import { Programming } from './programming';
import { Result, ok, err } from 'neverthrow';
import { ProgrammingDescriptionEmptyException, ProgrammingWordsEnoughException } from '../exceptions/programming-description';
import { DateNotEmptyException } from '../exceptions/date';

export type ProgrammingFactoryResult = Result<Programming, ProgrammingDescriptionEmptyException | ProgrammingWordsEnoughException | DateNotEmptyException>

export class ProggramingFactory {
    create(programmingId: ProgrammingVO, tourId: string, description: string, date: Date): ProgrammingFactoryResult {
        if (description.trim() === "") return err(new ProgrammingDescriptionEmptyException())
        if (description.trim().split(" ").length < 2) return err(new ProgrammingWordsEnoughException())
        if (!date) return err(new DateNotEmptyException())

        return ok(new Programming({
            programmingId,
            tourId,
            description,
            date
        }));
    }
}