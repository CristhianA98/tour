import { InfraestructureException, InfraestructureExceptionCode } from '../../../../../core/infraestructure/exceptions/infraestructure.exception';

export class ProgrammingCreateDatabaseException extends InfraestructureException {
    constructor(message: string) {
        super(ProgrammingCreateDatabaseException.getMessage(message));
        this.name = InfraestructureExceptionCode.SAVE_PROGRAMMING_DATABASE_EXCEPTION;
    }

    static getMessage(message: string) {
        return `ProgrammingCreateDatabaseException: ${message}`
    }
}