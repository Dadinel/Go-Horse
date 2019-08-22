import { Controller, Put, Body, Post } from '@nestjs/common';
import { Parser } from './parser.entity';
import { ParserService } from './parser.service';

@Controller('aggregator/parser')
export class ParserController {
    constructor(private readonly parserService: ParserService) {}

    @Put()
    async putParsedSource(@Body() parsed: Parser): Promise<Parser> {
        return await this.parserService.updateParsedSource(parsed);
    }

    @Post()
    async addParsedSource(@Body() parsed: Parser): Promise<Parser> {
        return await this.parserService.addParsedSource(parsed);
    }
}
