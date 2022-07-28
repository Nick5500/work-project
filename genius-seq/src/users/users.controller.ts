import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() dto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Post('pets')
  createPet(@Body() petDto) {
    return this.usersService.createPet(petDto);
  }
}
