import { Module } from '@nestjs/common';
import { ParserService } from './parser.service';
import { ParserController } from './parser.controller';
import { parserProviders } from './parser.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [ParserService, ...parserProviders],
    controllers: [ParserController],
})
export class ParserModule {}
