import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto) {
    const id = uuid();
    const artist: Artist = { id, ...createArtistDto };
    this.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throw new HttpException(`Artist doesn't exist`, HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = this.artists.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new HttpException(`Artist doesn't exist`, HttpStatus.NOT_FOUND);
    }

    const newArtist: Artist = { id, ...updateArtistDto };

    this.artists[index] = newArtist;
    return newArtist;
  }

  remove(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
    }

    this.artists.splice(index, 1);
  }
}
