import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { v4 as uuid } from 'uuid';
import { DataService } from 'src/data/data.service';
import { DataNotFoundException } from 'src/errors/errors';

@Injectable()
export class AlbumsService {
  private readonly albums: Album[] = [];

  constructor(private db: DataService) {
    this.albums = db.getAlbums();
  }

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
      throw new DataNotFoundException('Album');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = this.albums.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new DataNotFoundException('Album');
    }

    const newAlbum: Album = { id, ...updateAlbumDto };
    this.albums[index] = newAlbum;
    return newAlbum;
  }

  remove(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new DataNotFoundException('Album');
    }

    this.albums.splice(index, 1);
  }
}
