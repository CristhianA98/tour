import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { ProgrammingEntity } from './backoffice/bounded-contexts/tour-programming/infraestructure/entities/programming.entity';

let manager: EntityManager;

@Injectable()
export class AppService {

  private dataSource: DataSource | void;

  private dbConfig() {
    return {
      host: 'localhost',
      port: 3307,
      database: 'tour',
      username: 'tour',
      password: '123456',
      synchronize: true,
      logging: false
    }
  }

  async onModuleInit() {
    const entities = [ProgrammingEntity];
    const config = this.dbConfig();

    this.dataSource = await new DataSource({
      type: "mysql",
      ...config,
      entities
    }).initialize()
      /* .then(() => {
        console.log("Connected to database");
      }) */
      .catch(error => {
        console.log(error);
        process.exit(1);
      })
    manager = (this.dataSource as DataSource).manager;
  }

  static get manager() {
    return manager;
  }

}
