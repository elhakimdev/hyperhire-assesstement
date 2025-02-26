import { Injectable, NotFoundException } from "@nestjs/common";

import { Prisma } from "@prisma/client";
import { PrismaService } from "../../services/prisma/prisma.service";

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all menus hierarchically
   */
  async findAll() {
    return this.findMenuWithChildren(null); // Start from root
  }

  /**
   * Recursively fetch all menus and their children
   */
  async findMenuWithChildren(parentId: string | null = null): Promise<any[]> {
    const menus = await this.prisma.treeMenu.findMany({
      where: { parentId },
      include: { children: true }, // Fetch immediate children
    });

    for (const menu of menus) {
      menu.children = await this.findMenuWithChildren(menu.id); // Fetch nested children
    }

    return menus;
  }

  /**
   * Get a specific menu with depth and root
   */
  async findOne(id: string, depth = 2) {
    return this.getMenuWithDepth(id, depth);
  }

  private async getMenuWithDepth(id: string, depth: number) {
    if (depth === 0) {
      return this.prisma.treeMenu.findUnique({ where: { id } });
    }

    return this.prisma.treeMenu.findUnique({
      where: { id },
      include: {
        children: {
          include: depth > 1 ? { children: { include: { children: true } } } : {},
        },
      },
    });
  }

  /**
   * Create a menu item hierarchically
   */
  async create(data: { name: string; url?: string; parentId?: string }) {
    let generatedUrl = data.url || "";

    if (data.parentId) {
      const parent = await this.prisma.treeMenu.findUnique({
        where: { id: data.parentId },
      });

      if (!parent) {
        throw new NotFoundException("Parent menu not found");
      }

      const slug = this.slugify(data.name);
      generatedUrl = `${parent.url}/${slug}`;
    } else {
      generatedUrl = `/${this.slugify(data.name)}`;
    }

    return this.prisma.treeMenu.create({
      data: { ...data, url: generatedUrl },
    });
  }

  /**
   * Update a menu item
   */
  async update(id: string, data: Prisma.TreeMenuUpdateInput) {
    return this.prisma.treeMenu.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a menu item and all its children
   */
  async delete(id: string) {
    await this.prisma.treeMenu.deleteMany({
      where: { parentId: id },
    });

    return this.prisma.treeMenu.delete({
      where: { id },
    });
  }

  /**
   * Save menu structure (batch update)
   */
  async saveMenu(menuList: { id: string; parentId?: string | null }[]) {
    const updates = menuList.map((menu) =>
      this.prisma.treeMenu.update({
        where: { id: menu.id },
        data: { parentId: menu.parentId },
      })
    );

    return this.prisma.$transaction(updates);
  }

  /**
   * Helper function to convert a string into a slug
   */
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }
}
