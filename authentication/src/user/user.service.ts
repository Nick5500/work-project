import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { email } });
  }

  async create(dto: CreateUserDTO): Promise<User> {
    return this.userModel.create({
      email: dto.email,
      password: dto.password,
    });
  }
}
