import { Module } from '@nestjs/common';
import { Md5Service } from './md5.service';
import { Md5Controller } from './md5.controller';

@Module({providers: [Md5Service], controllers: [Md5Controller]})
export class Md5Module {}
