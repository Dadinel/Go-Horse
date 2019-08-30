import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { DatabaseModule } from '../database/database.module';
import { resultsProviders } from './results.provider';

@Module({
    imports: [DatabaseModule],
    providers: [ResultsService, ...resultsProviders],
    controllers: [ResultsController],
})
export class ResultsModule {}
