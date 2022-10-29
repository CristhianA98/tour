import { Programming, ProgrammingProperties } from '../../domain/agregates/programming';
import { ProgrammingEntity } from '../entities/programming.entity';
import { ProgrammingVO } from '../../value-objects/programming-id.vo';
export class ProgrammingDTO {

    static fromDomainToData(programming: Programming): ProgrammingEntity {
        const programmingEntity = new ProgrammingEntity();
        programmingEntity.programmingId = programming.properties().programmingId.value;
        programmingEntity.tourId = programming.properties().tourId;
        programmingEntity.description = programming.properties().description;
        programmingEntity.date = programming.properties().date;
        programmingEntity.active = programming.properties().active;
        programmingEntity.createdAt = programming.properties().createdAt;
        programmingEntity.updatedAt = programming.properties().updatedAt;
        programmingEntity.deletedAt = programming.properties().deletedAt;

        return programmingEntity;
    }

    static fromDataToDomain(programmingEntity: ProgrammingEntity): Programming {

        const result = ProgrammingVO.create(programmingEntity.programmingId);

        if (result.isOk()) {
            const programmingProperties: ProgrammingProperties = {
                programmingId: result.value,
                tourId: programmingEntity.tourId,
                description: programmingEntity.description,
                date: programmingEntity.date
            }
            return new Programming(programmingProperties);
        } else {
            return null;
        }

    }
}