import { Module } from '@nestjs/common';
import { TestCaseModule } from './testcase/testcase.module';

@Module({
  imports: [TestCaseModule],
})

export class AppModule {}
