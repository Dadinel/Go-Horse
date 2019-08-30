import { Inject, Injectable } from '@nestjs/common';
import { Parser } from './parser.entity';
import { ParserLines } from './lines.entity';
import { ParserDTO } from './parser.dto';

@Injectable()
export class ParserService {
    constructor(
        @Inject('PARSER_REPOSITORY') private readonly parserRepository: typeof Parser,
        @Inject('PARSERLINES_REPOSITORY') private readonly parserLinesRepository: typeof ParserLines,
      ) {}

    async updateParsedSource(parsed: ParserDTO): Promise<ParserDTO> {
        const parsedModel: Parser = this.getParserByDTO(parsed);
        const transaction: any = await this.parserRepository.sequelize.transaction();

        try {
            parsedModel.isNewRecord = false;
            const linesToDel = this.parserLinesRepository.findAll( { where: { id: parsed.id, source: parsed.source } } );

            await linesToDel.each( (line: ParserLines) => {
                line.destroy();
            });

            await this.saveCommitParser(parsedModel, transaction);
        } catch (e) {
            await this.rollback(e, transaction);
        }

        return parsed;
    }

    async addParsedSource(parsed: ParserDTO): Promise<ParserDTO> {
        const parsedModel: Parser = this.getParserByDTO(parsed);
        const transaction: any = await this.parserRepository.sequelize.transaction();

        try {
            await this.saveCommitParser(parsedModel, transaction);
        } catch (e) {
            this.rollback(e, transaction);
        }

        return parsed;
    }

    private getParserByDTO(parsed: ParserDTO): Parser {
        const parsedModel = new Parser();
        parsedModel.setDTO(parsed);
        return parsedModel;
    }

    private rollback(e: any, trans: any): void {
        // tslint:disable-next-line: no-console
        console.log(e);
        trans.rollback();
    }

    private async saveCommitParser(parser: Parser, trans: any): Promise<void> {
        await parser.saveAll();
        await trans.commit();
    }
}
