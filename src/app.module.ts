import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
// import { TracksModule } from './tracks/tracks.module';
// import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule, ArtistsModule, AlbumsModule],
})
export class AppModule {}
