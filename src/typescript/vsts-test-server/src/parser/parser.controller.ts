import { Controller, Put, Body, Post } from '@nestjs/common';
import { ParserDTO } from './parser.dto';
import { ParserService } from './parser.service';

@Controller('aggregator/parser')
export class ParserController {
    constructor(private readonly parserService: ParserService) {}

    @Put()
    async putParsedSource(@Body() parsed: ParserDTO): Promise<ParserDTO> {
        return await this.parserService.updateParsedSource(parsed);
    }

    @Post()
    async addParsedSource(@Body() parsed: ParserDTO): Promise<ParserDTO> {
        return await this.parserService.addParsedSource(parsed);
    }
}
