import { Module } from '@nestjs/common';
import { Md5Module } from './md5/md5.module';
import { ParserModule } from './parser/parser.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [Md5Module, ParserModule, ResultsModule],
})
export class AppModule {}
