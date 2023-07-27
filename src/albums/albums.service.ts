import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AlbumsService {
  private readonly albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    const id = uuid();
    const album: Album = { id, ...createAlbumDto };
    this.albums.push(album);
    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((a) => a.id === id);
    if (!album) {
      throw new HttpException(`Album doesn't exist`, HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = this.albums.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new HttpException(`Album doesn't exist`, HttpStatus.NOT_FOUND);
    }

    const newAlbum: Album = { id, ...updateAlbumDto };
    this.albums[index] = newAlbum;
    return newAlbum;
  }

  remove(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new HttpException(`Album doesn't exist`, HttpStatus.NOT_FOUND);
    }

    this.albums.splice(index, 1);
  }
}
