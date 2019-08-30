export class Controller {
    public tested: boolean = false;

    constructor(public testcase: string, public id: string, tested?: boolean) {
        if (tested) {
            this.tested = true;
        }
    }
}
