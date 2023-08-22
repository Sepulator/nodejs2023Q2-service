import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LoggingService } from './loggingservice/loggingservice.service';
import { LoggerModule } from './loggingservice/logger.module';
import { AuthModule } from './auth/auth.module';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    LoggerModule,
    AuthModule,
    IamModule,
  ],
  providers: [LoggingService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
