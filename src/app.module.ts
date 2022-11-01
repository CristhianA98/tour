import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppService } from './app.service';
import { CreateProggramingCommandHandler } from './backoffice/bounded-contexts/tour-programming/application/commands/create-programming.command';
import { ProgrammingController } from './backoffice/bounded-contexts/tour-programming/interfaces/http/programming.controller';
import { DeleteProgrammingCommandHandler } from './backoffice/bounded-contexts/tour-programming/application/commands/delete-programming.command';
import { UpdateProgrammingCommandHandler } from './backoffice/bounded-contexts/tour-programming/application/commands/update-programming.command';
import { ProgrammingInfraestructure } from './backoffice/bounded-contexts/tour-programming/infraestructure/programming.infraestructure';
import { ListProgrammingQueryHandler } from './backoffice/bounded-contexts/tour-programming/application/queries/list-programming.query';

const modules = [
  CqrsModule
];
const controllers = [
  ProgrammingController
];
const application = [
  CreateProggramingCommandHandler,
  DeleteProgrammingCommandHandler,
  UpdateProgrammingCommandHandler,
  ListProgrammingQueryHandler
]

const infraestructure = [
  ProgrammingInfraestructure
]

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [AppService, ...application, ...infraestructure],
})
export class AppModule { }
