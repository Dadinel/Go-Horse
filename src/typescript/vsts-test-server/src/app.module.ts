import { Module } from '@nestjs/common';
import { Md5Module } from './md5/md5.module';
import { ParserModule } from './parser/parser.module';
import { CoverageModule } from './coverage/coverage.module';

@Module({
  imports: [Md5Module, ParserModule, CoverageModule],
})
export class AppModule {}
