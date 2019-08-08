import { typeOfTestCase } from "../enum/Types";

export class TestCase {
    private _name: string;
    private _type: typeOfTestCase;
    private _tested: boolean = false;

    constructor(name: string, type: typeOfTestCase) {
        this._name = name;
        this._type = type;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get type(): typeOfTestCase {
        return this._type;
    }

    set type(type: typeOfTestCase) {
        this._type = type;
    }

    get isTested(): boolean {
        return this._tested;
    }

    set tested(tested: boolean) {
        this._tested = tested;
    }
}