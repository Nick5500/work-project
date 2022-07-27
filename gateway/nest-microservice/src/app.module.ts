import { Module } from '@nestjs/common';
import { MovieModule } from './movies/movie.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MovieModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
