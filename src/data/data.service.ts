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
  private readonly db: DBInMemory = {
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

  getAllFavsResponse(): FavoritesResponse {
    const artists = this.db.artists.filter((artist) =>
      this.db.favs.artists.includes(artist.id),
    );
    const tracks = this.db.tracks.filter((track) =>
      this.db.favs.tracks.includes(track.id),
    );
    const albums = this.db.albums.filter((album) =>
      this.db.favs.albums.includes(album.id),
    );

    return {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
  }

  find(id: string, key: string) {
    return this.db[key].find((a: { id: string }) => a.id == id);
  }

  findIndex(id: string, key: string) {
    return this.db[key].findIndex((a: { id: string }) => a.id == id);
  }

  removeAlbumId(id: string) {
    const tracks = this.db.tracks.filter((t) => t.albumId === id);
    if (tracks) {
      tracks.forEach((t) => (t.albumId = null));
    }
  }

  removeArtistId(id: string) {
    const tracks = this.db.tracks.filter((t) => t.artistId === id);
    const albums = this.db.albums.filter((t) => t.artistId === id);

    if (tracks) {
      tracks.forEach((t) => (t.artistId = null));
    }

    if (albums) {
      albums.forEach((a) => (a.artistId = null));
    }
  }

  removeFavsId(id: string, key: string) {
    const index = this.db.favs[key].findIndex((a: string) => a == id);
    if (index === -1) return;

    this.db.favs[key].splice(index, 1);
  }
}
