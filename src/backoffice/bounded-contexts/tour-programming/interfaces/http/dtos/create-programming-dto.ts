import { IsNotEmpty, IsString, IsUUID, IsDate, IsISO8601 } from "class-validator";

export class CreateProgrammingDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    tourId: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsISO8601()
    date: Date
}