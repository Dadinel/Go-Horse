import { Module } from '@nestjs/common';
import { SonarService } from './sonar.service';
import { SonarController } from './sonar.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [SonarService],
    controllers: [SonarController],
})
export class SonarModule {}
