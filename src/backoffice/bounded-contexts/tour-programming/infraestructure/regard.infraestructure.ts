import { Result, ok, err } from 'neverthrow';
import { ProgrammingNotFoundException } from './exceptions/programming-find-by-id';
import { AppService } from "src/app.service";
import { ProgrammingListByTourException } from './exceptions/programming-list-by-tour';
import { RegardRepository } from "../domain/repositories/Regard.repository";
import { RegardFindByProgrammingIdDatabaseException, RegardNotFoundException } from './exceptions/regard-find-by-id';
import { RegardCreateDatabaseException } from "./exceptions/regard-create";
import { Regard } from '../domain/agregates/regards';
import { RegardListByProgrammingException } from './exceptions/regard-list-by-programming-id';
import { RegardEntity } from './entities/regard.entity';
import { RegardDTO } from './dtos/regard.dto';
import { RegardListResult } from "../application/dtos/regard-list-result.dto";

export type RegardCreateResult =
    Result<
        Regard,
        RegardCreateDatabaseException
    >;

export type RegardFindByIdResult =
    Result<
        Regard,
        RegardFindByProgrammingIdDatabaseException | RegardNotFoundException
    >

export type RegardFindByProgrammingIdResult =
    Result<
        RegardListResult[],
        RegardListByProgrammingException | ProgrammingNotFoundException
    >

export class RegardInfraestructure implements RegardRepository {

    async findById(regardId: string): Promise<RegardFindByIdResult> {
        try {
            const programming_Entity = await AppService.manager.getRepository(RegardEntity).findOne({
                where: { programmingId: `${regardId}`, active: true }
            })

            if (!programming_Entity) {
                return err(new RegardNotFoundException());
            }


            return ok(RegardDTO.fromDataToDomain(programming_Entity));
        } catch (error) {
            return err(new RegardFindByProgrammingIdDatabaseException(error.sqlMessage));
        }

    }

    async save(regard: Regard): Promise<RegardCreateResult> {

        try {

            const regardEntity = RegardDTO.fromDomainToData(regard);

            const repositorySaved = await AppService.manager.getRepository(RegardEntity).save(regardEntity);

            return ok(RegardDTO.fromDataToDomain(repositorySaved))
        } catch (error) {
            return err(new RegardCreateDatabaseException(error.sqlMessage))
        }
    }

    async listByProgrammingId(programmingId: string): Promise<RegardFindByProgrammingIdResult> {
        try {
            const regardEntities = await AppService.manager.getRepository(RegardEntity).find({
                where: { programmingId: `${programmingId}`, active: true }
            })

            if (!regardEntities) {
                return err(new ProgrammingNotFoundException());
            }

            return ok(RegardDTO.fromDataToApplication(regardEntities));
        } catch (error) {
            return err(new ProgrammingListByTourException(error.sqlMessage));
        }
    }
}