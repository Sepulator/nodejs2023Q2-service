import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DataNotFoundException } from 'src/errors/errors';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.create({ data: createAlbumDto });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new DataNotFoundException('Album');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: { ...updateAlbumDto },
      });
    } catch {
      throw new DataNotFoundException('Album');
    }
  }

  async remove(id: string) {
    try {
      const album = await this.prisma.album.delete({ where: { id } });
      if (album) {
        await this.prisma.track.updateMany({
          where: { albumId: id },
          data: { albumId: null },
        });
      }
    } catch {
      throw new DataNotFoundException('Album');
    }
  }
}
