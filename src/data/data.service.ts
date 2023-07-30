import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import {
  Favorites,
  FavoritesResponse,
} from 'src/favorites/interfaces/favorite.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { User } from 'src/users/interfaces/user.interface';

export enum Collection {
  artists = 'artists',
  albums = 'albums',
  tracks = 'tracks',
}

interface DBInMemory {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favs: Favorites;
}

@Injectable()
export class DataService {
  private readonly db: DBInMemory = null;

  constructor() {
    this.db = {
      users: [],
      artists: [],
      albums: [],
      tracks: [],
      favs: {
        artists: [],
        albums: [],
        tracks: [],
      },
    };
  }

  getUsers() {
    return this.db.users;
  }
  getArtists() {
    return this.db.artists;
  }
  getAlbums() {
    return this.db.albums;
  }
  getTracks() {
    return this.db.tracks;
  }
  getFavs() {
    return this.db.favs;
  }

  getAllFavs() {
    const result: FavoritesResponse = { albums: [], artists: [], tracks: [] };

    this.db.favs.albums.forEach((f) =>
      result.albums.push(this.db.albums.find((a) => a.id === f)),
    );
    this.db.favs.artists.forEach((f) =>
      result.artists.push(this.db.artists.find((a) => a.id === f)),
    );
    this.db.favs.tracks.forEach((f) =>
      result.tracks.push(this.db.tracks.find((a) => a.id === f)),
    );

    return result;
  }

  find(id: string, key: string) {
    return this.db[key].find((a: { id: string }) => a.id == id);
  }

  findIndex(id: string, key: string) {
    return this.db[key].findIndex((a: { id: string }) => a.id == id);
  }
}
