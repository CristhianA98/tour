import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DeleteRegardDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    regardId: string
}