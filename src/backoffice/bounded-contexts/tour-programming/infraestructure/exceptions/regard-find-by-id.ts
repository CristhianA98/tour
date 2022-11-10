import { InfraestructureException, InfraestructureExceptionCode } from '../../../../../core/infraestructure/exceptions/infraestructure.exception';

export class RegardFindByProgrammingIdDatabaseException extends InfraestructureException {
    constructor(message: string) {
        super();
        this.name = InfraestructureExceptionCode.FIND_REGARD_BY_ID_DATABASE_EXCEPTION
    }

    static getMessage(message: string) {
        return `RegardFindByProgrammingIdDatabaseException: ${message}`
    }

}

export class RegardNotFoundException extends InfraestructureException {
    constructor() {
        super(RegardNotFoundException.getMessage());
        this.name = InfraestructureExceptionCode.REGARD_NOT_FOUND_EXCEPTION;
    }

    static getMessage() {
        return `ProgrammingNotFoundException`
    }
}