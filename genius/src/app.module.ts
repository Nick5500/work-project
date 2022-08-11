import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Pet, User } from './users/entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'node_postgres',
      entities: [User, Pet],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
