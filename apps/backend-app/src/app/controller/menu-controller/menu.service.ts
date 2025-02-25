import { Injectable, NotFoundException } from "@nestjs/common";

import { Prisma } from "@prisma/client";
import { PrismaService } from "../../services/prisma/prisma.service";

@Injectable()
export class MenuService {
  memo = new Map<string, any>(); // Memoization cache
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
    if (this.memo.has(parentId || 'root')) {
      return this.memo.get(parentId || 'root'); // Return cached result
    }

    const menus = this.prisma.treeMenu.findMany({
      where: { parentId },
      include: { children: true }, // Fetch immediate children
    });

    // Recursively fetch children
    for (const menu of await menus) {
      menu.children = await this.findMenuWithChildren(menu.id); // Fetch nested children
    }

    this.memo.set(parentId || 'root', menus); // Store in cache
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
    if (data.parentId) {
      const parentExists = await this.prisma.treeMenu.findUnique({
        where: { id: data.parentId },
      });

      if (!parentExists) {
        throw new NotFoundException("Parent menu not found");
      }
    }

    return this.prisma.treeMenu.create({
      data,
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
      where: { parentId: id }, // Delete children first
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
}
