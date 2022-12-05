import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { AppService } from './app.service';

class AppBody {
  readonly id: number;
}

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Version('1')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
