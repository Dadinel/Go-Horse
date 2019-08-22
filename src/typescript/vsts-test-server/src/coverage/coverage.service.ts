import { Injectable } from '@nestjs/common';
import { Coverage } from './coverage.entity';

@Injectable()
export class CoverageService {
    async updateCoverage(coverage: Coverage): Promise<Coverage> {
        // tslint:disable-next-line: no-console
        console.log('Arquivo que será atualizado: ', coverage);

        // Todo: Criar a regra de atualização de coverage
        return coverage;
    }

    async addCoverage(coverage: Coverage): Promise<Coverage> {
        // tslint:disable-next-line: no-console
        console.log('Arquivo que será incluso: ', coverage);

        // Todo: Criar a regra de inclusão de coverage
        return coverage;
    }
}
