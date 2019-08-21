import { Injectable } from '@nestjs/common';
import { Parser } from './parser.entity';

@Injectable()
export class ParserService {
    async updateParsedSource(parsed: Parser): Promise<Parser> {
        // tslint:disable-next-line: no-console
        console.log('Arquivo que será atualizado: ', parsed);

        // Todo: Criar a regra de atualização de parser
        return parsed;
    }

    async addParsedSource(parsed: Parser): Promise<Parser> {
        // tslint:disable-next-line: no-console
        console.log('Arquivo que será incluso: ', parsed);

        // Todo: Criar a regra de inclusão de parser
        return parsed;
    }
}
