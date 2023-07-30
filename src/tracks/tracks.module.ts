import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DataModule } from 'src/data/data.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DataModule],
})
export class TracksModule {}
