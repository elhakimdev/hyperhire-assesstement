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
    return this.prisma.treeMenu.findMany({
      where: { parentId: null }, // Only fetch top-level menus
      include: {
        children: {
          include: { children: true }, // Recursively fetch children
        },
      },
    });
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
