import { Inject, Injectable } from '@nestjs/common';
import { MD5 } from './md5.dto';
import { Parser } from '../parser/parser.entity';

@Injectable()
export class Md5Service {
    constructor(
        @Inject('PARSER_REPOSITORY') private readonly parserRepository: typeof Parser,
      ) {}

    async getMd5FromFile(sourceWhere: string, idWhere: string): Promise<MD5> {
        const parsed: Parser = await this.parserRepository.findOne( { where: { id: idWhere, source: sourceWhere.toUpperCase() } } );

        if (parsed) {
            return new MD5(parsed.source, parsed.md5);
        }

        return new MD5(sourceWhere, '');
    }
}
