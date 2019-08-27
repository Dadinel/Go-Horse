import { Controller, Post, Put, Get, Body, Param } from '@nestjs/common';
import { Md5Service } from './md5.service';
import { MD5 } from './md5.dto';

@Controller('aggregator/md5')
export class Md5Controller {
    constructor(private readonly md5Service: Md5Service) {}

    @Get('/:source/:id')
    async getMd5FromFile(@Param('source') source: string, @Param('id') id: string): Promise<MD5> {
        return await this.md5Service.getMd5FromFile(source, id);
    }
}
