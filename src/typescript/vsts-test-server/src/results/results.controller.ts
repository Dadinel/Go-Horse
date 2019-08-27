import { Controller, Post, Body } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {

    constructor(private readonly resultsService: ResultsService) {}

    @Post()
    async postTestCaseResults(@Body() results: any): Promise<any> {
        return await this.resultsService.postTestCaseResults(results);
    }
}
