import { Injectable } from '@nestjs/common';

import {
  DataNotFoundException,
  FavsNotFoundException,
} from 'src/errors/errors';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const artists = await this.prisma.artistFavs
      .findMany({
        include: { artist: true },
      })
      .then((v) =>
        v.map(({ artist }) => {
          return { ...artist };
        }),
      );

    const albums = await this.prisma.albumFavs
      .findMany({
        include: { album: true },
      })
      .then((v) =>
        v.map(({ album }) => {
          return { ...album };
        }),
      );

    const tracks = await this.prisma.trackFavs
      .findMany({
        select: { track: true },
      })
      .then((v) =>
        v.map(({ track }) => {
          return { ...track };
        }),
      );

    return { artists, albums, tracks };
  }

  async createTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) throw new FavsNotFoundException('Track');

    await this.prisma.trackFavs.create({
      data: { trackId: id },
    });

    return track;
  }

  async createAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) throw new FavsNotFoundException('Album');

    await this.prisma.albumFavs.create({
      data: { albumId: id },
    });

    return album;
  }

  async createArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) throw new FavsNotFoundException('Artist');

    await this.prisma.artistFavs.create({
      data: { artistId: id },
    });

    return artist;
  }

  async removeTrack(trackId: string) {
    try {
      return await this.prisma.trackFavs.delete({ where: { trackId } });
    } catch {
      throw new DataNotFoundException('Track');
    }
  }

  async removeAlbum(albumId: string) {
    try {
      return await this.prisma.albumFavs.delete({ where: { albumId } });
    } catch {
      throw new DataNotFoundException('Album');
    }
  }

  async removeArtist(artistId: string) {
    try {
      return await this.prisma.artistFavs.delete({ where: { artistId } });
    } catch {
      throw new DataNotFoundException('Artist');
    }
  }
}
