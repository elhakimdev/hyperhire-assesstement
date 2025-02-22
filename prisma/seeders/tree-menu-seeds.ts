/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const menuData = [
  {
    name: "System Management",
    url: "/system",
    children: [
      {
        name: "Users",
        url: "/system/users",
        children: [
          { name: "User List", url: "/system/users/list" },
          { name: "User Roles", url: "/system/users/roles" }
        ]
      },
      {
        name: "Roles",
        url: "/system/roles",
        children: [
          { name: "Role List", url: "/system/roles/list" },
          { name: "Role Permissions", url: "/system/roles/permissions" }
        ]
      },
      {
        name: "Settings",
        url: "/system/settings",
        children: [
          { name: "General Settings", url: "/system/settings/general" },
          { name: "Security Settings", url: "/system/settings/security" }
        ]
      }
    ]
  }
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
