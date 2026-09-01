-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "invitedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
