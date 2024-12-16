import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/RegisterUser';
import { LoginUserDto } from './dto/LoginUser';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() RegisterUserDto: RegisterUserDto) {
    return this.usersService.registerUser(RegisterUserDto);
  }
  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.usersService.loginUser(LoginUserDto);
  }
}
