import { Coverage } from './coverage.entity';
import { CoverageLines } from './lines.entity';
import { ClassTest } from './class.entity';
import { ClassTestMethods } from './method.entity';

export const resultsProviders = [
  {
    provide: 'COVERAGE_REPOSITORY',
    useValue: Coverage,
  },
  {
    provide: 'COVERAGELINES_REPOSITORY',
    useValue: CoverageLines,
  },
  {
    provide: 'CLASS_REPOSITORY',
    useValue: ClassTest,
  },
  {
    provide: 'CLASSMETHODS_REPOSITORY',
    useValue: ClassTestMethods,
  },
];
