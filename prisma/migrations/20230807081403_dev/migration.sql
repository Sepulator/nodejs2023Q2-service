/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the `Favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favoritesId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favoritesId";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favoritesId";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favoritesId";

-- DropTable
DROP TABLE "Favorites";

-- CreateTable
CREATE TABLE "ArtistFavs" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "ArtistFavs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumFavs" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "AlbumFavs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackFavs" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "TrackFavs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArtistFavs_artistId_key" ON "ArtistFavs"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumFavs_albumId_key" ON "AlbumFavs"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackFavs_trackId_key" ON "TrackFavs"("trackId");

-- AddForeignKey
ALTER TABLE "ArtistFavs" ADD CONSTRAINT "ArtistFavs_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumFavs" ADD CONSTRAINT "AlbumFavs_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackFavs" ADD CONSTRAINT "TrackFavs_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
