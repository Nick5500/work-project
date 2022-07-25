import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly appService: MovieService) {}

  @Get()
  async getAll(): Promise<any> {
    const movies = await this.appService.getAll();

    return movies;
  }

  @Get(':id')
  async getOneById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const movie = this.appService.getById(id);

    return movie;
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDTO): Promise<any> {
    const createdMovie = this.appService.create(createMovieDto);

    return createdMovie;
  }

  @Put(':id')
  async update(
    @Body() updateMovieDto: UpdateMovieDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.appService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.appService.delete(id);
  }
}
