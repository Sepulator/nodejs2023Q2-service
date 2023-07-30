import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DataModule } from 'src/data/data.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [DataModule],
})
export class ArtistsModule {}
