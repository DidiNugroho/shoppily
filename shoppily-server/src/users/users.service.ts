import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { RegisterUserDto } from './dto/RegisterUser';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const createdUser = new this.userModel(registerUserDto);
    return createdUser.save();
  }
}
