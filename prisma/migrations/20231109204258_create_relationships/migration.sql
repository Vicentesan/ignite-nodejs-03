/*
  Warnings:

  - You are about to drop the column `longitudo` on the `gyms` table. All the data in the column will be lost.
  - Added the required column `gymId` to the `check-ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `check-ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check-ins" ADD COLUMN     "gymId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "longitudo",
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;

-- AddForeignKey
ALTER TABLE "check-ins" ADD CONSTRAINT "check-ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check-ins" ADD CONSTRAINT "check-ins_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
