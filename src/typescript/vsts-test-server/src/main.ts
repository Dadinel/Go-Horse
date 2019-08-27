import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { commands } from './shared/commands';
import { CommanderStatic } from 'commander';

const command: CommanderStatic = commands();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(command.rest);
}

bootstrap();
