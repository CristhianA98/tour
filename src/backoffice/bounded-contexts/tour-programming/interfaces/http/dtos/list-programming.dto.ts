import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ListProgrammingDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    tourId: string
}