import { InfraestructureException, InfraestructureExceptionCode } from '../../../../../core/infraestructure/exceptions/infraestructure.exception';

export class RegardCreateDatabaseException extends InfraestructureException {
    constructor(message: string) {
        super(RegardCreateDatabaseException.getMessage(message));
        this.name = InfraestructureExceptionCode.SAVE_REGARD_DATABASE_EXCEPTION;
    }

    static getMessage(message: string) {
        return `RegardCreateDatabaseException: ${message}`
    }
}