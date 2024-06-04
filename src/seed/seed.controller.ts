import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Request } from 'express';

@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    return this.seedService.executeSeed();
  }

  @Get('info')
  async getIpInfo(@Req() request: Request) {
    const forwarded = request.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(',').shift() : forwarded?.[0] || 
               request.connection?.remoteAddress || 
               request.socket?.remoteAddress;
    console.log(ip);
    return { ip };
  } 

}
