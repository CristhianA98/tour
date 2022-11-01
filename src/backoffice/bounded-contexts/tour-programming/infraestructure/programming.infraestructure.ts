import { Programming } from "../domain/agregates/programming";
import { ProgrammingRepository } from "../domain/repositories/programming.repository";
import { ProgrammingEntity } from './entities/programming.entity';
import { ProgrammingDTO } from './dtos/programming.dto';
import { ProgrammingCreateDatabaseException } from './exceptions/programming-create';
import { Result, ok, err } from 'neverthrow';
import { ProgrammingFindByIdDatabaseException, ProgrammingNotFoundException } from './exceptions/programming-find-by-id';
import { AppService } from "src/app.service";
import { ProgrammingListResult } from '../application/dtos/programming-list-result.dto';
import { ProgrammingListByTourException } from './exceptions/programming-list-by-tour';

export type ProgrammingCreateResult = Result<Programming, ProgrammingCreateDatabaseException>;
export type ProgrammingFindByIdResult = Result<Programming, ProgrammingFindByIdDatabaseException | ProgrammingNotFoundException>
export type ProgrammingFindAllResult = Result<ProgrammingListResult[], any>

export class ProgrammingInfraestructure implements ProgrammingRepository {

    async findById(programmingId: string): Promise<ProgrammingFindByIdResult> {
        try {
            const programming_Entity = await AppService.manager.getRepository(ProgrammingEntity).findOne({
                where: { programmingId: `${programmingId}`, active: true }
            })

            if (!programming_Entity) {
                return err(new ProgrammingNotFoundException());
            }


            return ok(ProgrammingDTO.fromDataToDomain(programming_Entity));
        } catch (error) {
            return err(new ProgrammingFindByIdDatabaseException(error.sqlMessage));
        }

    }

    async save(programming: Programming): Promise<ProgrammingCreateResult> {

        try {

            const programmingEntity = ProgrammingDTO.fromDomainToData(programming);

            const repositorySaved = await AppService.manager.getRepository(ProgrammingEntity).save(programmingEntity);

            return ok(ProgrammingDTO.fromDataToDomain(repositorySaved))
        } catch (error) {
            return err(new ProgrammingCreateDatabaseException(error.sqlMessage))
        }
    }

    async listByTourId(tourId: string): Promise<ProgrammingFindAllResult> {
        try {
            const programmingEntities = await AppService.manager.getRepository(ProgrammingEntity).find({
                where: { tourId: `${tourId}`, active: true }
            })

            if (!programmingEntities) {
                return err(new ProgrammingNotFoundException());
            }

            return ok(ProgrammingDTO.fromDataToApplication(programmingEntities));
        } catch (error) {
            return err(new ProgrammingListByTourException(error.sqlMessage));
        }
    }
}