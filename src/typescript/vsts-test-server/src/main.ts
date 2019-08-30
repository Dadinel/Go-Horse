import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { commands } from './shared/commands';
import { CommanderStatic } from 'commander';
import { updateController } from './controller/controller.util';

const command: CommanderStatic = commands();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // updateController();
  // setInterval( updateController, 45000 );
  await app.listen(command.rest);
}

bootstrap();
