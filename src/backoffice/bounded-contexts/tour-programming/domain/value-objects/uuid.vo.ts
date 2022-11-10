import { Result, err, ok } from 'neverthrow'
import { validate as uuidValidate } from 'uuid';
import { ValueObject } from './value-object';
import { UuidIdInvalidException } from '../exceptions/uuid-id';

interface uuidProps {
    value: string
}

export type uuidIdResult = Result<UuidVO, UuidIdInvalidException>;

export class UuidVO extends ValueObject<uuidProps> {

    private constructor(props: uuidProps) {
        super(props);
    }

    static create(uuid: string): uuidIdResult {
        if (!uuidValidate(uuid)) {
            return err(new UuidIdInvalidException());
        }


        return ok(new UuidVO({ value: uuid }));
    }

    get value() {
        return this.props.value;
    }
}