import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProgrammingCommand } from '../../application/commands/create-programming.command';
import { DeleteProgrammingCommand } from '../../application/commands/delete-programming.command';
import { UpdateProgrammingCommand } from '../../application/commands/update-programming.command';
import { CreateProgrammingDTO } from './dtos/create-programming-dto';

@Controller("programming")
export class ProgrammingController {

    constructor(private readonly commandBus: CommandBus) { }

    @Post()
    async create(@Body() body: CreateProgrammingDTO) {
        const { tourId, description, date } = body;

        const command = new CreateProgrammingCommand(tourId, description, date);
        const response = await this.commandBus.execute(command);

        return response;
    }

    @Delete(':programmingId')
    delete(@Param() params: any) {
        const { programmingId } = params;

        const command = new DeleteProgrammingCommand(programmingId);
        this.commandBus.execute(command);

        return "ok Eliminado"
    }

    @Put(":programmmingId")
    update(@Param() params: any, @Body() body: any) {
        const { programmmingId } = params;
        const { description, duration, date } = body;

        const command = new UpdateProgrammingCommand(programmmingId, date, description, duration);
        this.commandBus.execute(command);

        return "ok Actualizado"
    }
}