import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppService } from './app.service';
import { CreateProggramingCommandHandler } from './backoffice/bounded-contexts/tour-programming/application/commands/create-programming.command';
import { ProgrammingController } from './backoffice/bounded-contexts/tour-programming/interfaces/http/programming.controller';
import { DeleteProgrammingCommandHandler } from './backoffice/bounded-contexts/tour-programming/application/commands/delete-programming.command';
import { UpdateProgrammingCommandHandler } from './backoffice/bounded-contexts/tour-programming/application/commands/update-programming.command';
import { ProgrammingInfraestructure } from './backoffice/bounded-contexts/tour-programming/infraestructure/programming.infraestructure';
import { ListProgrammingQueryHandler } from './backoffice/bounded-contexts/tour-programming/application/queries/list-programming.query';
import { RegardController } from './backoffice/bounded-contexts/tour-programming/interfaces/http/regard.controller';
import { CreateRegardCommandHandler } from './backoffice/bounded-contexts/tour-programming/application/commands/create-regard.command';
import { DeleteRegardCommandHandler } from './backoffice/bounded-contexts/tour-programming/application/commands/delete-regard.command';
import { UpdateRegardCommandHandler } from './backoffice/bounded-contexts/tour-programming/application/commands/update-regard.command';
import { ListRegardQueryHandler } from './backoffice/bounded-contexts/tour-programming/application/queries/list-regard.query';
import { RegardInfraestructure } from './backoffice/bounded-contexts/tour-programming/infraestructure/Regard.infraestructure';

const modules = [
  CqrsModule
];

const controllers = [
  ProgrammingController,
  RegardController
];

const application = [
  CreateProggramingCommandHandler,
  DeleteProgrammingCommandHandler,
  UpdateProgrammingCommandHandler,
  ListProgrammingQueryHandler,
  CreateRegardCommandHandler,
  DeleteRegardCommandHandler,
  UpdateRegardCommandHandler,
  ListRegardQueryHandler
]

const infraestructure = [
  ProgrammingInfraestructure,
  RegardInfraestructure
]

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [AppService, ...application, ...infraestructure],
})
export class AppModule { }
