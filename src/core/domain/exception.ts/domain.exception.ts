
export enum DomainExceptionCode {
    DEFAULT = 'DEFAULT',
    PROGRAMMING_ID_INVALID = 'PROGRAMMING_ID_INVALID',
    TOUR_ID_INVALID = 'TOUR_ID_INVALID',
    PROGRAMMING_DESCRIPTION_EMPTY = 'PROGRAMMING_DESCRIPTION_EMPTY',
    PROGRAMMING_WORDS_ENOUGH_EXCEPTION = 'PROGRAMMING_WORDS_ENOUGH_EXCEPTION',
    DATE_EMPTY = 'DATE_EMPTY'
}

export abstract class DomainException extends Error {
    constructor(message?: string) {
        super(message);
        this.name = DomainExceptionCode.DEFAULT;
    }
}