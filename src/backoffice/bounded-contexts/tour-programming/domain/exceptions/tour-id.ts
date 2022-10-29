import { DomainException, DomainExceptionCode } from '../../../../../core/domain/exception.ts/domain.exception';

export class TourIdInvalidException extends DomainException {
    constructor() {
        super(TourIdInvalidException.getMessage());
        this.name = DomainExceptionCode.TOUR_ID_INVALID;
    }

    static getMessage() {
        return 'TourId must be a valid UUID';
    }
}