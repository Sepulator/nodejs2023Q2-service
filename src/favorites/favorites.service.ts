import { Injectable } from '@nestjs/common';
import { Collection, DataService } from 'src/data/data.service';
import { Favorites } from './interfaces/favorite.interface';
import { FavsNotFoundException } from 'src/errors/errors';
import { transformKey } from './utils/transform';

@Injectable()
export class FavoritesService {
  private readonly favs: Favorites = { artists: [], albums: [], tracks: [] };

  constructor(private db: DataService) {
    this.favs = db.getFavs();
  }

  findAll() {
    return this.favs;
  }

  create(id: string, key: Collection) {
    const result = this.db.find(id, key);
    if (!result) {
      throw new FavsNotFoundException(`${transformKey(key)}`);
    }
    this.favs[key].push(id);
    return result;
  }

  remove(id: string, key: Collection) {
    const index = this.db.findIndex(id, key);
    if (index === -1) {
      throw new FavsNotFoundException(`${transformKey(key)}`);
    }
    this.favs[key].splice(index, 1);
  }
}
