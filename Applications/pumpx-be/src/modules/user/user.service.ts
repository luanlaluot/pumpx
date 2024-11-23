import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: Partial<User>): Promise<any> {
    try {
      const newUser = new this.userModel(data).save();

      return {
        success: true,
        data: newUser,
      };
    } catch (error) {
      console.log('🚀 ~ UserService ~ create ~ error:', error);
      throw new BadRequestException(error.message || 'Some thing went wrong');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
