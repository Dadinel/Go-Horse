import { Injectable } from '@nestjs/common';
import { MD5 } from './md5.entity';

@Injectable()
export class Md5Service {

    async getMd5FromFile(source: string): Promise<MD5> {
        // tslint:disable-next-line: no-console
        console.log('Pesquisa do MD5 do fonte: ' + source);

        // Todo: Criar a consulta do MD5
        return new MD5(source, '');
    }
}
