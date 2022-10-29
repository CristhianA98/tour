import { Programming } from "../domain/agregates/programming";
import { ProgrammingRepository } from "../domain/repositories/programming.repository";
import { AppService } from '../../../../app.service';
import { ProgrammingEntity } from './entities/programming.entity';
import { ProgrammingDTO } from './dtos/programming.dto';
import { ProgrammingCreateDatabaseException } from './exceptions/programming-create';
import { Result, ok, err } from 'neverthrow';
import { ProgrammingFindByIdDatabaseException } from "./exceptions/programming-find-by-id";

export type ProgrammingCreateResult = Result<Programming, ProgrammingCreateDatabaseException>;
export type ProgrammingFindByIdResult = Result<Programming, ProgrammingFindByIdDatabaseException>

export class ProgrammingInfraestructure implements ProgrammingRepository {
    async findById(programmingId: string): Promise<ProgrammingFindByIdResult> {
        try {
            const programmingEntity = await AppService.manager.getRepository(ProgrammingEntity).findOne({ where: { programmingId } });;
            if (!programmingEntity) {
                return null;
            }

            return ok(ProgrammingDTO.fromDataToDomain(programmingEntity));
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
}