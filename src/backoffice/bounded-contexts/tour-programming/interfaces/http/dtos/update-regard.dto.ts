import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateRegardDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    regardId: string
}