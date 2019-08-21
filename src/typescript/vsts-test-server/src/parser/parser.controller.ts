import { Controller, Put, Body, Post } from '@nestjs/common';
import { Parser } from './parser.entity';
import { ParserService } from './parser.service';

@Controller('aggregator/parser')
export class ParserController {
    constructor(private readonly parserService: ParserService) {}

    @Put()
    putParsedSource(@Body() parsed: Parser): Promise<Parser> {
        return this.parserService.updateParsedSource(parsed);
    }

    @Post()
    addParsedSource(@Body() parsed: Parser): Promise<Parser> {
        return this.parserService.addParsedSource(parsed);
    }
}
