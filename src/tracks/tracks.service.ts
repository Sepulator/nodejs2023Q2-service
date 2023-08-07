import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DataNotFoundException } from 'src/errors/errors';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new DataNotFoundException('Track');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: { ...updateTrackDto },
      });
    } catch {
      throw new DataNotFoundException('Track');
    }
  }

  async remove(id: string) {
    const trackFavs = await this.prisma.trackFavs.findUnique({ where: { id } });

    if (trackFavs) {
      await this.prisma.trackFavs.delete({ where: { trackId: id } });
      await this.prisma.track.delete({ where: { id } });
    } else {
      try {
        await this.prisma.track.delete({ where: { id } });
      } catch {
        throw new DataNotFoundException('Track');
      }
    }
  }
}
