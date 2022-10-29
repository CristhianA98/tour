import { DomainException, DomainExceptionCode } from '../../../../../core/domain/exception.ts/domain.exception';

export class DateNotEmptyException extends DomainException {
    constructor() {
        super(DateNotEmptyException.getMessage());
        this.name = DomainExceptionCode.DATE_EMPTY;
    }

    static getMessage() {
        return `Date cannot empty`;
    }
}