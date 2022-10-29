import { v4 as uuidv4 } from 'uuid';
import { ProgrammingVO } from '../../value-objects/programming-id.vo';

export type PlacesProperties = {
    readonly programmingId: ProgrammingVO;
    readonly description: string;
}

export class Place {
    private readonly placeId: string;
    private readonly programmingId: ProgrammingVO;
    private readonly description: string;

    constructor(properties: PlacesProperties) {
        Object.assign(this, properties);
        this.placeId = uuidv4();
    }

    properties() {
        return {
            placeId: this.placeId,
            programmingId: this.programmingId,
            description: this.description
        }
    }
}