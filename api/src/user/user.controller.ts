import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from './models/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserDTO) {
    return this.userService.create(user);
  }

  @Get(':id')
  findOne(@Param('id') id: UserDTO['id']) {
    return this.userService.findOne(id);
  }

  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: UserDTO['id']) {
    return this.userService.delete(id);
  }

  @Put(':id')
  updateOne(@Param('id') id: UserDTO['id'], @Body() user: Partial<UserDTO>) {
    return this.userService.updateOne(id, user);
  }
}
