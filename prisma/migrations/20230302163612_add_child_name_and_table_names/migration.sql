/*
  Warnings:

  - You are about to drop the `Children` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Weight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Children" DROP CONSTRAINT "Children_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "Weight" DROP CONSTRAINT "Weight_childrenId_fkey";

-- DropTable
DROP TABLE "Children";

-- DropTable
DROP TABLE "Weight";

-- CreateTable
CREATE TABLE "children" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "parent_id" TEXT NOT NULL,

    CONSTRAINT "children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weights" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" SMALLINT NOT NULL,
    "childrenId" TEXT NOT NULL,

    CONSTRAINT "weights_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weights" ADD CONSTRAINT "weights_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;
