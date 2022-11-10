import { Programming, ProgrammingProperties } from '../../domain/agregates/programming';
import { ProgrammingEntity } from '../entities/programming.entity';
import { ProgrammingVO } from '../../domain/value-objects/programming-id.vo';
import { ProgrammingListResult } from '../../application/dtos/programming-list-result.dto';
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
        programmingEntity.duration = programming.properties().duration;

        return programmingEntity;
    }

    static fromDataToDomain(programmingEntity: ProgrammingEntity): Programming {

        const result = ProgrammingVO.create(programmingEntity.programmingId);

        if (result.isOk()) {
            const programmingProperties: ProgrammingProperties = {
                programmingId: result.value,
                tourId: programmingEntity.tourId,
                description: programmingEntity.description,
                date: programmingEntity.date,
                duration: programmingEntity.duration
            }
            return new Programming(programmingProperties);
        } else {
            return null;
        }

    }

    static fromDataToApplication(programmingEntity: ProgrammingEntity[]): ProgrammingListResult[] {

        return programmingEntity.map((programmingEntity) => ({
            programmingId: programmingEntity.programmingId,
            tourId: programmingEntity.tourId,
            description: programmingEntity.description,
            date: programmingEntity.date,
            duration: programmingEntity.duration
        }))
    }
}