import { Methods } from './methods.dto';

export class Tests {
    public readonly classname: string;
    public readonly coverage: any;
    public readonly methods: Methods[];
    public readonly runned: boolean;
}
