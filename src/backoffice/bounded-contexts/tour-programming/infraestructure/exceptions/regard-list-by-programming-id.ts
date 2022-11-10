import { InfraestructureException, InfraestructureExceptionCode } from '../../../../../core/infraestructure/exceptions/infraestructure.exception';

export class RegardListByProgrammingException extends InfraestructureException {
    constructor(message: string) {
        super(RegardListByProgrammingException.getMessage(message));
        this.name = InfraestructureExceptionCode.LIST_REGARD_BY_PROGRAMMING_NOT_FOUND;
    }

    static getMessage(message: string) {
        return `RegardListByProgrammingException: ${message}`
    }
}
