import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    const id = uuid();
    const track: Track = { id, ...createTrackDto };
    this.tracks.push(track);
    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) {
      throw new HttpException(`Track doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.tracks.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new HttpException(`Track doesn't exist`, HttpStatus.NOT_FOUND);
    }

    const newTrack: Track = { id, ...updateTrackDto };
    this.tracks[index] = newTrack;
    return newTrack;
  }

  remove(id: string) {
    const index = this.tracks.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new HttpException(`Track doesn't exist`, HttpStatus.NOT_FOUND);
    }

    this.tracks.splice(index, 1);
  }
}
