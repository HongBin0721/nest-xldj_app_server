import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('lists')
  getRoles(): object {
    return this.roleService.getRoles();
  }

  // @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post('create')
  addRole(@Body() appBody): object {
    return this.roleService.addRole(appBody);
  }
}
