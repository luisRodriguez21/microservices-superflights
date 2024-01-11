import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/user.dto';
import { IUser } from '../common/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });

    return await newUser.save();
  }

  async getUsersAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  async getUserById(id: string): Promise<IUser> {
    return await this.model.findOne({ _id: id });
  }

  async findByUsername(username: string): Promise<IUser> {
    return await this.model.findOne({ username });
  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async updateUser(id: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const user = { ...userDTO, password: hash };

    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'User deleted successfully' };
  }
}
