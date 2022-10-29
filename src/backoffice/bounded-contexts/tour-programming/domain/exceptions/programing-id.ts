import { DomainException, DomainExceptionCode } from '../../../../../core/domain/exception.ts/domain.exception';

export class ProgrammingIdInvalidException extends DomainException {
    constructor() {
        super(ProgrammingIdInvalidException.getMessage());
        this.name = DomainExceptionCode.PROGRAMMING_ID_INVALID;
    }

    static getMessage() {
        return 'ProgrammingId must be a valid UUID';
    }
}