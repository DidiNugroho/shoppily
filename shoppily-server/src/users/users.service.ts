import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { RegisterUserDto } from './dto/RegisterUser';
import { comparePassword, hashPassword } from 'src/utils/bcrypt';
import { plainToInstance } from 'class-transformer';

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

  async loginUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    if (comparePassword(password, user.password)) {
      throw new Error('Invalid password');
    }

    return plainToInstance(User, user.toObject());
  }
}
