-- DropForeignKey
ALTER TABLE "AlbumFavs" DROP CONSTRAINT "AlbumFavs_albumId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistFavs" DROP CONSTRAINT "ArtistFavs_artistId_fkey";

-- DropForeignKey
ALTER TABLE "TrackFavs" DROP CONSTRAINT "TrackFavs_trackId_fkey";

-- AddForeignKey
ALTER TABLE "ArtistFavs" ADD CONSTRAINT "ArtistFavs_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumFavs" ADD CONSTRAINT "AlbumFavs_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackFavs" ADD CONSTRAINT "TrackFavs_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
