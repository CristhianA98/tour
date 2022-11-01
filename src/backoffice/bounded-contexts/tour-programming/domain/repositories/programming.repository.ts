import { ProgrammingCreateResult, ProgrammingFindByIdResult, ProgrammingFindAllResult } from '../../infraestructure/programming.infraestructure';
import { Programming } from '../agregates/programming';

export interface ProgrammingRepository {
    save(programming: Programming): Promise<ProgrammingCreateResult>;
    findById(programmingId: string): Promise<ProgrammingFindByIdResult>;
    listByTourId(tourId:string): Promise<ProgrammingFindAllResult>
}