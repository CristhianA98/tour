import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ListRegardDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    programmingId: string
}