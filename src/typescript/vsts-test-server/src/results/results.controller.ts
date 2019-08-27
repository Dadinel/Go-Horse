import { Controller, Post, Body } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsDTO } from './dto/results.dto';

@Controller('results')
export class ResultsController {

    constructor(private readonly resultsService: ResultsService) {}

    @Post()
    async postTestCaseResults(@Body() results: ResultsDTO): Promise<any> {
        return await this.resultsService.postTestCaseResults(results);
    }
}
