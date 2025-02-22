-- CreateTable
CREATE TABLE "TreeMenu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "icon" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TreeMenu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TreeMenu" ADD CONSTRAINT "TreeMenu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TreeMenu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
