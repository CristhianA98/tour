
export enum InfraestructureExceptionCode {
    DEFAULT = 'DEFAULT',
    SAVE_PROGRAMMING_DATABASE_EXCEPTION = 'SAVE_PROGRAMMING_DATABASE_EXCEPTION',
    FIND_PROGRAMMING_BY_ID_EXCEPTION = 'FIND_PROGRAMMING_BY_ID_EXCEPTION',
    PROGRAMMING_NOT_FOUND_EXCEPTION = 'PROGRAMMING_NOT_FOUND_EXCEPTION',
    LIST_PROGRAMMING_BY_TOUR_NOT_FOUND = 'LIST_PROGRAMMING_BY_TOUR_NOT_FOUND'
}

export class InfraestructureException extends Error {
    constructor(mesage?: string) {
        super(mesage);
        this.name = InfraestructureExceptionCode.DEFAULT;
    }
}