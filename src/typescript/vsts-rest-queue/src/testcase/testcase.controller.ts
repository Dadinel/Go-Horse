import { Controller, Post, Body, Get } from '@nestjs/common';
import { TestCaseService } from './testcase.service';
import { TestCase } from '../shared/model/TestCase';

@Controller('testcase')
export class TestCaseController {
    constructor(private readonly testCaseService: TestCaseService) {}

    @Post('/server')
    addServerTestCase(@Body() testCases: TestCase[]): Promise<void> {
        return this.testCaseService.addTestCases(testCases, 'server');
    }

    @Get('/server')
    getServerTestCase(): Promise<TestCase[]> {
        return this.testCaseService.getTestCases('server');
    }

    @Post('/database')
    addDatabaseTestCases(@Body() testCases: TestCase[]): Promise<void> {
        return this.testCaseService.addTestCases(testCases, 'database');
    }

    @Get('/database')
    getDatabaseCases(): Promise<TestCase[]> {
        return this.testCaseService.getTestCases('database');
    }

    @Post('/environment')
    addEnvironmentTestCases(@Body() testCases: TestCase[]): Promise<void> {
        return this.testCaseService.addTestCases(testCases, 'environment');
    }

    @Get('/environment')
    getEnvironmentCases(): Promise<TestCase[]> {
        return this.testCaseService.getTestCases('environment');
    }
}
