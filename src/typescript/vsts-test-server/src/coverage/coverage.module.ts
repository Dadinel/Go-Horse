import { Module } from '@nestjs/common';
import { CoverageService } from './coverage.service';
import { CoverageController } from './coverage.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [CoverageService],
    controllers: [CoverageController],
})
export class CoverageModule {}
