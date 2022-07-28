import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { Pet, User } from './users/model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'node_postgres',
      models: [User, Pet],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
  ],
})
export class AppModule {}
