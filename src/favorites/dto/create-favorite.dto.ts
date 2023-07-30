import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFavoriteTrackDto {
  @IsString()
  @IsNotEmpty()
  tracks: string[];
}
export class CreateFavoriteArtistDto {
  @IsString()
  @IsNotEmpty()
  tracks: string[];
}
export class CreateFavoriteAlbumDto {
  @IsString()
  @IsNotEmpty()
  tracks: string[];
}
