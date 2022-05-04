import { Controller, Get, Post, Query, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SystemDebugDTO } from './types';

@ApiTags('System')
@Controller('system')
export class SystemController {
  @Get('info')
  public info(): unknown {
    return {
      uptime: process.uptime(),
    };
  }

  @ApiTags('Debug')
  @ApiOperation({
    description: 'Опис операції',
  })
  @ApiQuery({
    name: 'arg',
    description: 'Дуже розумний опис параметру',
    required: false,
    deprecated: true,
  })
  @Post('debug/:code')
  public debug(
    @Param('code', new ParseIntPipe()) code: number,
    @Query('arg') arg: string,
    @Body() body: SystemDebugDTO
  ): unknown {
    return {
      code,
      arg,
      body,
    };
  }
}
