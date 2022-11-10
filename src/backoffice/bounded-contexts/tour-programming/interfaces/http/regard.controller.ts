import { Body, Controller, Delete, Param, Post, Put, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRegardgDTO } from './dtos/create-regard-dto';
import { CreateRegardCommand } from '../../application/commands/create-regard.command';
import { DeleteRegardDTO } from './dtos/delete-regard.dto';
import { DeleteRegardCommand } from '../../application/commands/delete-regard.command';
import { UpdateRegardDTO } from './dtos/update-regard.dto';
import { ListRegardDTO } from './dtos/list-regard.dto';
import { ListRegardQuery } from '../../application/queries/list-regard.query';
import { UpdateRegardCommand } from '../../application/commands/update-regard.command';

@Controller("regard")
export class RegardController {

    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    async create(@Body() body: CreateRegardgDTO) {
        const { programmingId, date } = body;

        const command = new CreateRegardCommand(programmingId, date);
        const response = await this.commandBus.execute(command);

        return response;
    }

    @Delete(':regardId')
    async delete(@Param() params: DeleteRegardDTO) {
        const { regardId } = params;

        const command = new DeleteRegardCommand(regardId);
        await this.commandBus.execute(command);

        return "ok Eliminado"
    }

    @Put(":regardId")
    async update(@Param() params: UpdateRegardDTO, @Body() body: any) {
        const { regardId } = params;
        const { date } = body;

        const command = new UpdateRegardCommand(regardId, date);
        await this.commandBus.execute(command);

        return "ok Actualizado"
    }

    @Get(':programmingId')
    async listByProgramming(@Param() params: ListRegardDTO) {
        const { programmingId } = params;
        const query = new ListRegardQuery(programmingId);

        return await this.queryBus.execute(query);
    }
}