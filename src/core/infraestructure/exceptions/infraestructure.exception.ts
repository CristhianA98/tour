
export enum InfraestructureExceptionCode {
    DEFAULT = 'DEFAULT',
    SAVE_PROGRAMMING_DATABASE_EXCEPTION = 'SAVE_PROGRAMMING_DATABASE_EXCEPTION',
    FIND_PROGRAMMING_BY_ID_EXCEPTION = 'FIND_PROGRAMMING_BY_ID_EXCEPTION'
}

export class InfraestructureException extends Error {
    constructor(mesage?: string) {
        super(mesage);
        this.name = InfraestructureExceptionCode.DEFAULT;
    }
}