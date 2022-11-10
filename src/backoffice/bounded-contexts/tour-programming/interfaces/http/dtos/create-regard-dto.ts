import { IsNotEmpty, IsString, IsUUID, IsISO8601 } from "class-validator";

export class CreateRegardgDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    programmingId: string

    @IsNotEmpty()
    @IsISO8601()
    date: Date
}