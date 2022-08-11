import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Pet } from './entity/pet.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ take: 3, skip: 1, relations: ['pet'] });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(dto) {
    const user = this.usersRepository.create(dto);

    return this.usersRepository.save(user);
  }

  createPet(petDto) {
    const pet = this.petRepository.create(petDto);

    return this.petRepository.save(pet);
  }
}
