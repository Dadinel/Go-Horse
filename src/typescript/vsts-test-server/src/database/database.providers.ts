import { Sequelize } from 'sequelize-typescript';
import { Parser } from '../parser/parser.entity';
import { ParserLines } from '../parser/lines.entity';
import { Coverage } from '../results/coverage.entity';
import { CoverageLines } from '../results/lines.entity';
import { ClassTest } from '../results/class.entity';
import { ClassTestMethods } from '../results/method.entity';

let mySequelize: Sequelize;

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
      sequelize.addModels([Parser, ParserLines, Coverage, CoverageLines, ClassTest, ClassTestMethods]);
      await sequelize.sync();
      mySequelize = sequelize;
      return sequelize;
    },
  },
];

export function getSequelizeInstance(): Sequelize {
  return mySequelize;
}
