import { Sequelize } from 'sequelize-typescript';
import { Parser } from '../parser/parser.entity';
import { ParserLines } from '../parser/lines.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize: Sequelize = new Sequelize({
        operatorsAliases: false,
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Postgres2019!',
        database: 'ci',
      });
      sequelize.addModels([Parser, ParserLines]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
