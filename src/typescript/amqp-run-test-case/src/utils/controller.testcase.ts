let _finish: boolean = false;

class ControllerTestCase {
    public isFinished(): boolean {
        return _finish;
    }

    public setFinish(finish: boolean): void {
        _finish = finish;
    }
}

export const controllerTestCase: ControllerTestCase = new ControllerTestCase();