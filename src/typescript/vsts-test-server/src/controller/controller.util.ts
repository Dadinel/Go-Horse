import { Controller } from './controller.model';
import { get, IncomingMessage } from 'http';
import { ResultsDTO } from '../shared/result-dto/results.dto';

const controller: Controller[] = [];

export function setTested(test: ResultsDTO): void {
    const control: Controller = controller.find( (ctrl: Controller) => {
        return ctrl.id === test.id && test.tests && !ctrl.tested && ctrl.testcase.toUpperCase() === test.tests.classname.toUpperCase();
    });

    if (control) {
        control.tested = true;
    } else {
        controller.push(new Controller(test.tests.classname, test.id, true));
    }
}

export function isFullTested(id: string): boolean {
    return !controller.some( (control: Controller) => {
        return control.id === id && !control.tested;
    });
}

export async function updateController() {
    const options: any = {host: 'localhost' , port: 3101, path: '/controller/testcases/' };

    get(options, (res: IncomingMessage) => {
        let testCases: any = false;

        if (res.statusCode >= 200 || res.statusCode <= 299) {
            res.on('data', (data: any) => {
                if (data) {
                    try {
                        testCases = JSON.parse(data);

                        if (testCases && testCases.length) {
                            for (const test of testCases) {
                                controller.push( new Controller(test.testcase, test.id) );
                            }
                        }
                    } catch {
                        //
                    }
                }
            });
        }
    });
}
