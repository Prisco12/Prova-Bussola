import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from './interface/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  private async userHash(pass: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(pass, saltOrRounds);
    return hash
  }

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    createUserDto.password = await this.userHash(createUserDto.password)
    const user = new this.userModel(createUserDto)
    return user.save()
  }

  findAll() {
    return this.userModel.find();
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  findByName(name: string){
    return this.userModel.findOne({ name: name }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserInterface> {
    if (updateUserDto.password) {
      updateUserDto.password = await this.userHash(updateUserDto.password)
    }
    return this.userModel.findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true });
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id: id});
  }
}
