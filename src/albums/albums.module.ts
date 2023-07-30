import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DataModule } from 'src/data/data.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [DataModule],
})
export class AlbumsModule {}
