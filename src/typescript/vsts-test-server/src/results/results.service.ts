import { Injectable } from '@nestjs/common';

@Injectable()
export class ResultsService {
    public async postTestCaseResults(results: any): Promise<any> {
        // tslint:disable-next-line: no-console
        console.log(results);
        return true;
    }
}
