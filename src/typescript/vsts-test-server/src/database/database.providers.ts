import { Sequelize } from 'sequelize-typescript';
import { Parser } from '../parser/parser.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        operatorsAliases: false,
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'ci',
      });
      sequelize.addModels([Parser]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
