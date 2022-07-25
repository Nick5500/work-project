import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  name: string;

  @IsInt()
  rating: number;

  @IsArray()
  time: string[];
}
