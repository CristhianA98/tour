import { ProgrammingVO } from '../../domain/value-objects/programming-id.vo';
import { RegardEntity } from '../entities/regard.entity';
import { Regard, RegardProperties } from '../../domain/agregates/regards';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { RegardListResult } from '../../application/dtos/regard-list-result.dto';

export class RegardDTO {

    static fromDomainToData(regard: Regard): RegardEntity {
        const regardEntity = new RegardEntity();
        regardEntity.regardId = regard.properties().regardId.value;
        regardEntity.programmingId = regard.properties().programmingId.value;
        regardEntity.date = regard.properties().date;
        regardEntity.active = regard.properties().active;
        regardEntity.createdAt = regard.properties().createdAt;
        regardEntity.updatedAt = regard.properties().updatedAt;
        regardEntity.deletedAt = regard.properties().deletedAt;

        return regardEntity;
    }

    static fromDataToDomain(regardEntity: RegardEntity): Regard {

        const regardIdresult = UuidVO.create(regardEntity.regardId);
        const programmingIdresult = ProgrammingVO.create(regardEntity.regardId);

        if (regardIdresult.isOk() && programmingIdresult.isOk()) {
            const regardProperties: RegardProperties = {
                regardId: regardIdresult.value,
                programmingId: programmingIdresult.value,
                date: regardEntity.date
            }
            return new Regard(regardProperties);
        } else {
            return null;
        }

    }

    static fromDataToApplication(regardEntity: RegardEntity[]): RegardListResult[] {

        return regardEntity.map((regardEntity) => ({
            regardId: regardEntity.regardId,
            programmingId: regardEntity.programmingId,
            date: regardEntity.date
        }))
    }
}