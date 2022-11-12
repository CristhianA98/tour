import { DomainExceptionCode, DomainException } from '../../../../../core/domain/exception.ts/domain.exception';


export class NumberInvalidException extends DomainException {
    constructor() {
        super(NumberInvalidException.getMessage());
        this.name = DomainExceptionCode.NUMBER_INVALID;
    }

    static getMessage() {
        return 'Is not a number';
    }
}