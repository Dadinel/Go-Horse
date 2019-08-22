import { Controller, Put, Body, Post } from '@nestjs/common';
import { Coverage } from './coverage.entity';
import { CoverageService } from './coverage.service';

@Controller('coverage')
export class CoverageController {
    constructor(private readonly coverageService: CoverageService) {}

    @Put()
    async putCoverage(@Body() coverage: Coverage): Promise<Coverage> {
        return await this.coverageService.updateCoverage(coverage);
    }

    @Post()
    async addCoverage(@Body() coverage: Coverage): Promise<Coverage> {
        return await this.coverageService.addCoverage(coverage);
    }
}
