import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, IsISO8601, IsNumber } from "class-validator";

export class CreateRegardgDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    programmingId: string

    @IsNotEmpty()
    @IsISO8601()
    date: Date

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    duration: number
}