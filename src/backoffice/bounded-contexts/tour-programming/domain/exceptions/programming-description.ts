import { DomainException, DomainExceptionCode } from '../../../../../core/domain/exception.ts/domain.exception';

export class ProgrammingDescriptionEmptyException extends DomainException {
    constructor() {
        super(ProgrammingDescriptionEmptyException.getMessage());
        this.name = DomainExceptionCode.PROGRAMMING_DESCRIPTION_EMPTY;
    }

    static getMessage() {
        return `Description cannot empty`;
    }
}

export class ProgrammingWordsEnoughException extends DomainException{
    constructor(){
        super(ProgrammingWordsEnoughException.getMessage());
        this.name = DomainExceptionCode.PROGRAMMING_WORDS_ENOUGH_EXCEPTION;
    }

    static getMessage() {
        return `Description must have at least 2 words`;
    }
}