import { Tests } from './tests.dto';
import { LCov } from './lcov.dto';

export class ResultsDTO {
    public readonly id: string;
    public readonly tests: Tests;
    public readonly lcov: LCov;
}
