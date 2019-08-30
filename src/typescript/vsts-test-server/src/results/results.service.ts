import { Inject, Injectable } from '@nestjs/common';
import { updateController, setTested } from '../controller/controller.util';
import { ResultsDTO } from '../shared/result-dto/results.dto';
import { Coverage } from './coverage.entity';
import { CoverageLines } from './lines.entity';
import { ClassTest } from './class.entity';
import { ClassTestMethods } from './method.entity';

@Injectable()
export class ResultsService {
    constructor(
        @Inject('COVERAGE_REPOSITORY') private readonly coverageRepository: typeof Coverage,
        @Inject('COVERAGELINES_REPOSITORY') private readonly coverageLinesRepository: typeof CoverageLines,
        @Inject('CLASS_REPOSITORY') private readonly classRepository: typeof ClassTest,
        @Inject('CLASSMETHODS_REPOSITORY') private readonly classMethodsRepository: typeof ClassTestMethods,
      ) {}

    public async postTestCaseResults(results: ResultsDTO): Promise<any> {
        const id: string = results.id;
        const transaction: any = await this.coverageRepository.sequelize.transaction();

        try {
            // TODO: Verificar se será necessário chamar o updateController para ter certeza que o controle de testes está atualizado
            // await updateController();

            // COVERAGE - Linhas
            for (const test of results.lcov.TNs) {
                const coverageTest: Coverage = new Coverage();

                const existTestedSource: boolean = await this.existTestedSource(id, test.SF);

                if (existTestedSource) {
                    coverageTest.isNewRecord = false;
                }

                coverageTest.source = test.SF.toUpperCase();
                coverageTest.id = id;
                coverageTest.lines = [];

                for (const line of test.lines) {
                    // tslint:disable-next-line: radix
                    const hits: number = parseInt(line.hits);

                    if ( hits > 0) {
                        const testLine = new CoverageLines();
                        // tslint:disable-next-line: radix
                        testLine.setCoverage(coverageTest, parseInt(line.DA));
                        coverageTest.lines.push(testLine);
                    }
                }

                const testedLines: CoverageLines[] = await this.getTestedLines(id, test.SF);

                if (testedLines && testedLines.length > 0) {
                    for (const line of testedLines) {

                        const foundLine: CoverageLines = coverageTest.lines.find( (newLine: CoverageLines) => newLine.line === line.line );

                        // if ( !coverageTest.lines.some( (testedLine: CoverageLines) => testedLine.line === line.line ) ) {
                        if (!foundLine) {
                            line.setCoverage(coverageTest, line.line);
                            coverageTest.lines.push(line);
                        } else {
                            foundLine.isNewRecord = false;
                        }
                    }
                }

                await coverageTest.saveAll();
            }

            // TESTCASE - Métodos...
            const testedClass: ClassTest = new ClassTest();
            testedClass.id = id;
            testedClass.source = results.tests.classname.toUpperCase();
            testedClass.methods = [];

            const existTestedClass: boolean = await this.existTestedClass(id, testedClass.source);

            if (existTestedClass) {
                testedClass.isNewRecord = false;
            }

            for (const method of results.tests.methods) {
                const testedMethod = new ClassTestMethods();

                let message: string;

                if (method.skiped) {
                    message = 'Esse método não foi executado (skip)';
                } else {
                    message = method.message;
                }

                testedMethod.setClass(testedClass, method.methodname, method.success, message);
                testedClass.methods.push(testedMethod);
            }

            await testedClass.saveAll();

            await transaction.commit();
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.log(e);
            await transaction.rollback();
        }

        setTested(results);
        // tslint:disable-next-line: no-console
        console.log(results);
        return true;
    }

    private async existTestedSource(idTest: string, name: string): Promise<boolean> {
        const exist: Coverage = await this.coverageRepository.findOne( { where: { id: idTest, source: name } } );

        if (exist !== null && exist.id === idTest && exist.source.toUpperCase() === name.toUpperCase()) {
            return true;
        } else {
            return false;
        }
    }

    private async existTestedClass(idTest: string, name: string): Promise<boolean> {
        const exist: ClassTest = await this.classRepository.findOne( { where: { id: idTest, source: name } } );

        if (exist !== null && exist.id === idTest && exist.source.toUpperCase() === name.toUpperCase()) {
            return true;
        } else {
            return false;
        }
    }

    private async getTestedLines(idTest: string, name: string): Promise<CoverageLines[]> {
        return await this.coverageLinesRepository.findAll( { where: { id: idTest, source: name } } );
    }

    // const parsedModel: Parser = this.getParserByDTO(parsed);
    // const transaction: any = await this.parserRepository.sequelize.transaction();

    // try {
    //     parsedModel.isNewRecord = false;
    //     const linesToDel = this.parserLinesRepository.findAll( { where: { id: parsed.id, source: parsed.source } } );

    //     await linesToDel.each( (line: ParserLines) => {
    //         line.destroy();
    //     });

    //     await this.saveCommitParser(parsedModel, transaction);
    // } catch (e) {
    //     this.rollback(e, transaction);
    // }

    // return parsed;
}
