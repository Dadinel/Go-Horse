import { Module } from '@nestjs/common';
import { Md5Module } from './md5/md5.module';
import { ParserModule } from './parser/parser.module';

@Module({
  imports: [Md5Module, ParserModule],
})
export class AppModule {}
