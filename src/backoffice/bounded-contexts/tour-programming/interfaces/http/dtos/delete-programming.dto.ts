import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DeleteProgrammingDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    programmingId: string
}