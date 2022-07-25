import { IsArray, IsInt, IsString } from 'class-validator';

export class UpdateMovieDTO {
  @IsString()
  name?: string;

  @IsInt()
  rating?: number;

  @IsArray()
  time?: string[];
}
