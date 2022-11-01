import { InfraestructureException, InfraestructureExceptionCode } from '../../../../../core/infraestructure/exceptions/infraestructure.exception';

export class ProgrammingListByTourException extends InfraestructureException {
    constructor(message: string) {
        super(ProgrammingListByTourException.getMessage(message));
        this.name = InfraestructureExceptionCode.LIST_PROGRAMMING_BY_TOUR_NOT_FOUND;
    }

    static getMessage(message: string) {
        return `ProgrammingListByTourException: ${message}`
    }
}
