import { Result, err, ok } from 'neverthrow'
import { validate as uuidValidate } from 'uuid';
import { ValueObject } from './value-object';
import { ProgrammingIdInvalidException } from '../domain/exceptions/programing-id';

interface ProgrammingProps {
    value: string
}

export type programmingIdResult = Result<ProgrammingVO, ProgrammingIdInvalidException>;

export class ProgrammingVO extends ValueObject<ProgrammingProps> {

    private constructor(props: ProgrammingProps) {
        super(props);
    }

    static create(uuid: string): programmingIdResult {
        if (!uuidValidate(uuid)) {
            return err(new ProgrammingIdInvalidException());
        }


        return ok(new ProgrammingVO({ value: uuid }));
    }

    get value() {
        return this.props.value;
    }
}