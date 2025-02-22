-- CreateTable
CREATE TABLE "tree_menu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "icon" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tree_menu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tree_menu" ADD CONSTRAINT "tree_menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "tree_menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
