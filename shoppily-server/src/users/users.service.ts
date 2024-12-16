import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { RegisterUserDto } from './dto/RegisterUser';
import { comparePassword, hashPassword } from 'src/utils/bcrypt';
import { plainToInstance } from 'class-transformer';
import { LoginUserDto } from './dto/LoginUser';
import { signToken } from 'src/utils/jwt';
import { LoginResponse } from 'src/types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = hashPassword(registerUserDto.password);
    const createdUser = new this.userModel({
      ...registerUserDto,
      password: hashedPassword,
    });

    const savedUser = await createdUser.save();

    return plainToInstance(User, savedUser.toObject());
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const user = await this.userModel.findOne({ email: loginUserDto.email });

    if (!user) {
      throw new Error('User not found');
    }

    if (!comparePassword(loginUserDto.password, user.password)) {
      throw new Error('Invalid password');
    }

    const token = signToken({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    });

    return {
      user: plainToInstance(User, user.toObject()),
      token,
    };
  }
}
