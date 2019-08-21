import { Controller, Post, Put, Get, Body, Param } from '@nestjs/common';
import { Md5Service } from './md5.service';
import { MD5 } from './md5.entity';

@Controller('aggregator/md5')
export class Md5Controller {
    constructor(private readonly md5Service: Md5Service) {}

    @Get('/:source')
    getMd5FromFile(@Param('source') source: string): Promise<MD5> {
        return this.md5Service.getMd5FromFile(source);
    }
}
