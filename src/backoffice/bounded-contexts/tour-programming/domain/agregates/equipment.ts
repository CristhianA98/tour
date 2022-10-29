import { v4 as uuidv4 } from 'uuid';
import { ProgrammingVO } from '../../value-objects/programming-id.vo';

export type EquipmentProperties = {
    readonly programmingId: ProgrammingVO;
    readonly description: string;
}

export class Equipment {
    private readonly requerimentId: ProgrammingVO;
    private readonly equipmentId: string;
    private readonly description: string;

    constructor(properties: EquipmentProperties) {
        Object.assign(this, properties);
        this.equipmentId = uuidv4();
    }

    properties() {
        return {
            requerimentId: this.requerimentId,
            programmingId: this.equipmentId,
            description: this.description
        }
    }
}