import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { v4 as uuid } from 'uuid';
import { DataService } from 'src/data/data.service';
import { DataNotFoundException } from 'src/errors/errors';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  constructor(private db: DataService) {
    this.tracks = db.getTracks();
  }

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
      throw new DataNotFoundException('Track');
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.tracks.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new DataNotFoundException('Track');
    }

    const newTrack: Track = { id, ...updateTrackDto };
    this.tracks[index] = newTrack;
    return newTrack;
  }

  remove(id: string) {
    const index = this.tracks.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new DataNotFoundException('Track');
    }

    this.tracks.splice(index, 1);
  }
}
