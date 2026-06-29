/*
  Warnings:

  - A unique constraint covering the columns `[seq]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Message_seq_key" ON "Message"("seq");
