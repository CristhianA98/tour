import { Result, err, ok } from 'neverthrow'
import { validate as uuidValidate } from 'uuid';
import { ValueObject } from './value-object';
import { TourIdInvalidException } from '../domain/exceptions/tour-id';

interface TourProps {
    value: string
}

export type tourIdResult = Result<tourVO, TourIdInvalidException>;

export class tourVO extends ValueObject<TourProps> {

    private constructor(props: TourProps) {
        super(props);
    }

    static create(uuid: string): tourIdResult {
        if (!uuidValidate(uuid)) {
            return err(new TourIdInvalidException());
        }


        return ok(new tourVO({ value: uuid }));
    }

    get value() {
        return this.props.value;
    }
}