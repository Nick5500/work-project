import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pet, User } from './model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Pet)
    private petModel: typeof Pet,
  ) {}

  async findAll(): Promise<User[]> {
    const user = await this.userModel.findAll({
      include: { all: true },
      limit: 3,
      offset: 2,
    });

    return user;
  }

  async create(dto): Promise<User> {
    const user = await this.userModel.create(dto);
    return user;
  }

  async createPet(petDto) {
    const pet = await this.petModel.create(petDto);
    return pet;
  }
}
