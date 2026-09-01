/*
  Warnings:

  - You are about to drop the `_DocumentCollaborators` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DocumentCollaborators" DROP CONSTRAINT "_DocumentCollaborators_A_fkey";

-- DropForeignKey
ALTER TABLE "_DocumentCollaborators" DROP CONSTRAINT "_DocumentCollaborators_B_fkey";

-- DropTable
DROP TABLE "_DocumentCollaborators";
