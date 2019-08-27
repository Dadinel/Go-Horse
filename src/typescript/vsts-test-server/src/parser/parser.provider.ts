import { Parser } from './parser.entity';
import { ParserLines } from './lines.entity';

export const parserProviders = [
  {
    provide: 'PARSER_REPOSITORY',
    useValue: Parser,
  },
  {
    provide: 'PARSERLINES_REPOSITORY',
    useValue: ParserLines,
  },
];
