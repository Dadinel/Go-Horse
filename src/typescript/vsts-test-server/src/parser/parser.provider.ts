import { Parser } from './parser.entity';

export const catsProviders = [
  {
    provide: 'PARSER_REPOSITORY',
    useValue: Parser,
  },
];
