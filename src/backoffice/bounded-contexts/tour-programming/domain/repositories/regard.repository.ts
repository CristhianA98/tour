import { RegardCreateResult, RegardFindByIdResult, RegardFindByProgrammingIdResult } from '../../infraestructure/Regard.infraestructure';
import { Regard } from '../agregates/regards';

export interface RegardRepository {
    save(regard: Regard): Promise<RegardCreateResult>;
    findById(regardId: string): Promise<RegardFindByIdResult>;
    listByProgrammingId(programmingId: string): Promise<RegardFindByProgrammingIdResult>
}