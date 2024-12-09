import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/RegisterUser';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() RegisterUserDto: RegisterUserDto) {
    return this.usersService.registerUser(RegisterUserDto);
  }
}
