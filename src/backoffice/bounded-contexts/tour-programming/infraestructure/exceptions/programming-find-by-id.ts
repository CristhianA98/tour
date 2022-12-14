import { InfraestructureException, InfraestructureExceptionCode } from '../../../../../core/infraestructure/exceptions/infraestructure.exception';

export class ProgrammingFindByIdDatabaseException extends InfraestructureException {
    constructor(message: string) {
        super(ProgrammingFindByIdDatabaseException.getMessage(message));
        this.name = InfraestructureExceptionCode.FIND_PROGRAMMING_BY_ID_EXCEPTION;
    }

    static getMessage(message: string) {
        return `ProgrammingFindByIdDatabaseException: ${message}`
    }
}

export class ProgrammingNotFoundException extends InfraestructureException {
    constructor() {
        super(ProgrammingNotFoundException.getMessage());
        this.name = InfraestructureExceptionCode.PROGRAMMING_NOT_FOUND_EXCEPTION;
    }

    static getMessage() {
        return `ProgrammingNotFoundException`
    }
}