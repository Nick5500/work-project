import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MovieService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private readonly serverUrl = this.configService.get('SERVER_URL');

  getAll() {
    const axiosRes = this.httpService.get(`${this.serverUrl}movies`);

    return lastValueFrom(axiosRes.pipe(map((response) => response.data.data)));
  }

  getById(movieId: number) {
    const axiosRes = this.httpService.get(`${this.serverUrl}movie/${movieId}`);

    return lastValueFrom(axiosRes.pipe(map((response) => response.data.data)));
  }

  create(movie: CreateMovieDTO) {
    const axiosRes = this.httpService.post(`${this.serverUrl}movie`, movie);

    return lastValueFrom(axiosRes.pipe(map((response) => response.data.data)));
  }

  update(movieId: number, movie: UpdateMovieDTO) {
    const axiosRes = this.httpService.put(
      `${this.serverUrl}movie/${movieId}`,
      movie,
    );

    return lastValueFrom(axiosRes.pipe(map((response) => response.data.data)));
  }

  delete(movieId: number) {
    const axiosRes = this.httpService.delete(
      `${this.serverUrl}movie/${movieId}`,
    );

    return lastValueFrom(axiosRes.pipe(map((response) => response.data.data)));
  }
}
