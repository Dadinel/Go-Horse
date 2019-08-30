import { Controller, Param, Get } from '@nestjs/common';
import { SonarService } from './sonar.service';

@Controller('sonar')
export class SonarController {

    constructor(private readonly sonarService: SonarService) {}

    @Get('coverage/:id')
    async getCoverage(@Param('id') id: string): Promise<any> {
        return await this.sonarService.generateSonarCoverage(id);
    }

    @Get('test/:id')
    async getTests(@Param('id') id: string): Promise<any> {
        return await this.sonarService.generateSonarTests(id);
    }
}
