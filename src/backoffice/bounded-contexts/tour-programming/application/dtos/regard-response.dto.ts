import { Programming } from '../../domain/agregates/programming';
import { Regard } from '../../domain/agregates/regards';

export interface RegardCreateResponse {
    regardId: string;
    programmingId: string;
    date: Date;
}

export class RegardResponse {
    static fromDomainToResponse(regard: Regard): RegardCreateResponse {
        return {
            regardId: regard.properties().regardId.value,
            programmingId: regard.properties().programmingId.value,
            date: regard.properties().date
        }
    }
}