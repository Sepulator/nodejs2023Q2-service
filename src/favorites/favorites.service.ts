import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';

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

    const tracks: Track[] = await this.prisma.trackFavs
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
    try {
      const track = await this.prisma.trackFavs.create({
        data: { trackId: id },
        select: { track: true },
      });

      return { ...track.track };
    } catch (error) {
      throw new FavsNotFoundException('Track');
    }
  }

  async createAlbum(id: string) {
    try {
      const album = await this.prisma.albumFavs.create({
        data: { albumId: id },
        select: { album: true },
      });

      return { ...album.album };
    } catch (error) {
      throw new FavsNotFoundException('Album');
    }
  }

  async createArtist(id: string) {
    try {
      const artist = await this.prisma.artistFavs.create({
        data: { artistId: id },
        select: { artist: true },
      });

      return { ...artist.artist };
    } catch (error) {
      throw new FavsNotFoundException('Artist');
    }
  }

  async removeTrack(id: string) {
    try {
      return await this.prisma.trackFavs.delete({ where: { id } });
    } catch {
      throw new DataNotFoundException('Track');
    }
  }

  async removeAlbum(id: string) {
    try {
      return await this.prisma.albumFavs.delete({ where: { id } });
    } catch {
      throw new DataNotFoundException('Album');
    }
  }

  async removeArtist(id: string) {
    try {
      return await this.prisma.artistFavs.delete({ where: { id } });
    } catch {
      throw new DataNotFoundException('Artist');
    }
  }
}
