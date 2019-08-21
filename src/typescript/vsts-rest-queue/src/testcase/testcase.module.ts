import { Module } from '@nestjs/common';
import { TestCaseService } from './testcase.service';
import { TestCaseController } from './testcase.controller';

@Module({providers: [TestCaseService], controllers: [TestCaseController]})
export class TestCaseModule {}
