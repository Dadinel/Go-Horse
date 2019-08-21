import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createTestCaseExchange } from './shared/testcase/testcase.amqp';
import { commands } from './shared/command/commands';
import { CommanderStatic } from 'commander';

const command: CommanderStatic = commands();

async function bootstrap() {
  createTestCaseExchange(command.address, command.port);
  const app = await NestFactory.create(AppModule);
  await app.listen(command.rest);
}

bootstrap();
