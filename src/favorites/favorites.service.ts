import { Injectable } from '@nestjs/common';
import { Collection, DataService } from 'src/data/data.service';
import { Favorites } from './interfaces/favorite.interface';
import {
  DataNotFoundException,
  FavsNotFoundException,
} from 'src/errors/errors';
import { transformKey } from './utils/transform';

@Injectable()
export class FavoritesService {
  private readonly favs: Favorites = { artists: [], albums: [], tracks: [] };

  constructor(private db: DataService) {
    this.favs = db.getFavs();
  }

  findAll() {
    return this.db.getAllFavsResponse();
  }

  create(id: string, key: Collection) {
    const result = this.db.find(id, key);

    if (!result) {
      throw new FavsNotFoundException(`${transformKey(key)}`);
    }

    this.favs[key].push(id);
    return result;
  }

  removeTrack(id: string) {
    const index = this.favs.tracks.findIndex((t) => t === id);
    if (index === -1) {
      throw new DataNotFoundException(`Track`);
    }
    this.favs.tracks.splice(index, 1);
  }

  removeAlbum(id: string) {
    const index = this.favs.albums.findIndex((t) => t === id);
    if (index === -1) {
      throw new DataNotFoundException(`Album`);
    }

    this.favs.albums.splice(index, 1);
  }

  removeArtist(id: string) {
    const index = this.favs.artists.findIndex((t) => t === id);
    if (index === -1) {
      throw new DataNotFoundException(`Artist`);
    }

    this.favs.artists.splice(index, 1);
  }
}
