import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateProgrammingDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    programmingId: string
}