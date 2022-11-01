import { Body, Controller, Delete, Param, Post, Put, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProgrammingCommand } from '../../application/commands/create-programming.command';
import { DeleteProgrammingCommand } from '../../application/commands/delete-programming.command';
import { UpdateProgrammingCommand } from '../../application/commands/update-programming.command';
import { CreateProgrammingDTO } from './dtos/create-programming-dto';
import { DeleteProgrammingDTO } from './dtos/delete-programming.dto';
import { UpdateProgrammingDTO } from './dtos/update-programming.dto';
import { ListProgrammingQuery } from '../../application/queries/list-programming.query';
import { ListProgrammingDTO } from './dtos/list-programming.dto';

@Controller("programming")
export class ProgrammingController {

    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    async create(@Body() body: CreateProgrammingDTO) {
        const { tourId, description, date } = body;

        const command = new CreateProgrammingCommand(tourId, description, date);
        const response = await this.commandBus.execute(command);

        return response;
    }

    @Delete(':programmingId')
    async delete(@Param() params: DeleteProgrammingDTO) {
        const { programmingId } = params;

        const command = new DeleteProgrammingCommand(programmingId);
        await this.commandBus.execute(command);

        return "ok Eliminado"
    }

    @Put(":programmingId")
    async update(@Param() params: UpdateProgrammingDTO, @Body() body: any) {
        const { programmingId } = params;
        const { description, duration, date } = body;

        const command = new UpdateProgrammingCommand(programmingId, date, description, duration);
        await this.commandBus.execute(command);

        return "ok Actualizado"
    }

    @Get(':tourId')
    async listByTour(@Param() params: ListProgrammingDTO) {
        const { tourId } = params;
        const query = new ListProgrammingQuery(tourId);

        return await this.queryBus.execute(query);
    }
}