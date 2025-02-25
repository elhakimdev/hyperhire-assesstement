/* eslint-disable @typescript-eslint/no-explicit-any */
import {PrismaClient} from "@prisma/client";
import { accountManagementTree } from "./account-menus";
import { financeServiceTree } from "./fin-service-menu";
import { systemMenuTree } from "./system-menus";

const prisma = new PrismaClient();

const menuData = [
  systemMenuTree,
  accountManagementTree,
  financeServiceTree,
];

/**
 * Recursive function to seed menu data
 */
async function seedMenus(parentId: string | null, menus: {[key:string]: any}[]) {
  for (const menu of menus) {
    const createdMenu = await prisma.treeMenu.create({
      data: {
        name: menu.name,
        url: menu.url,
        parentId,
      }
    });

    if (menu.children && menu.children?.length > 0) {
      await seedMenus(createdMenu.id, menu.children);
    }
  }
}

/**
 * Main function to execute the seed
 */
async function main() {
  console.log("Seeding menu...");
  await prisma.treeMenu.deleteMany(); // Clear old data
  await seedMenus(null, menuData);
  console.log("Seeding completed!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
