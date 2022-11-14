import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { ProgrammingEntity } from './backoffice/bounded-contexts/tour-programming/infraestructure/entities/programming.entity';
import { RegardEntity } from './backoffice/bounded-contexts/tour-programming/infraestructure/entities/regard.entity';
import * as mongoose from 'mongoose';

let manager: EntityManager;

export interface IDBConfigMongo {
  user: string;
  pass: string;
  host: string;
  database: string;
}

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

  private dbConfigMongo(): IDBConfigMongo {
    return {
      user: "Cristhian",
      pass: "KmJJCxBeFYZvLEpH",
      database: "eventsourcing",
      host: "sourcing.n2ocsvr.mongodb.net"
    }
  }

  async onModuleInit() {
    const entities = [ProgrammingEntity, RegardEntity];
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

    const configMongo = this.dbConfigMongo();

    try {
      await mongoose.connect(`mongodb+srv://${configMongo.user}:${configMongo.pass}@${configMongo.host}/${configMongo.database}?retryWrites=true&w=majority`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  static get manager() {
    return manager;
  }

}
