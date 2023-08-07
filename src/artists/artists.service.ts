import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DataNotFoundException } from 'src/errors/errors';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new DataNotFoundException('Artist');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: { ...updateArtistDto },
      });
    } catch {
      throw new DataNotFoundException('Artist');
    }
  }

  async remove(id: string) {
    const artistFavs = await this.prisma.artistFavs.findUnique({
      where: { artistId: id },
    });

    if (artistFavs) {
      await this.prisma.artistFavs.delete({ where: { artistId: id } });
      await this.prisma.artist.delete({ where: { id } });
    } else {
      try {
        const artist = await this.prisma.artist.delete({ where: { id } });

        if (artist) {
          await this.prisma.track.updateMany({
            where: { artistId: id },
            data: {
              artistId: null,
            },
          });

          await this.prisma.album.updateMany({
            where: { artistId: id },
            data: {
              artistId: null,
            },
          });
        }
      } catch {
        throw new DataNotFoundException('Artist');
      }
    }
  }
}
