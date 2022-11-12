import { Result, err, ok } from 'neverthrow'
import { ValueObject } from './value-object';
import { NumberInvalidException } from '../exceptions/number';

interface numberProps {
    value: number
}

export type numberResult = Result<NumberVO, NumberInvalidException>;

export class NumberVO extends ValueObject<numberProps> {

    private constructor(props: numberProps) {
        super(props);
    }

    static create(num: number): numberResult {
        if (isNaN(num)) {
            return err(new NumberInvalidException());
        }

        return ok(new NumberVO({ value: num }));
    }

    get value() {
        return this.props.value;
    }
}