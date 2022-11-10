import { v4 as uuidv4 } from 'uuid';
import { ProgrammingVO } from '../value-objects/programming-id.vo';

export type RequerimentProperties = {
    readonly programmingId: ProgrammingVO;
    readonly description: string;
}

export class Requeriment {
    private readonly requerimentId: string;
    private readonly programmingId: ProgrammingVO;
    private readonly description: string;

    constructor(properties: RequerimentProperties) {
        Object.assign(this, properties);
        this.requerimentId = uuidv4();              
    }

    properties() {
        return {
            requerimentId: this.requerimentId,
            programmingId: this.programmingId,
            description: this.description
        }
    }
}