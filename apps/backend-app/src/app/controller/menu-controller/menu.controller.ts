import { Controller, Post, Get, Patch, Delete, Body, Param, Query } from "@nestjs/common";
import { MenuService } from "./menu.service";

@Controller("menus")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll() {
    return this.menuService.findAll();

  }

  @Get(":id")
  findOne(@Param("id") id: string, @Query("depth") depth: number) {
    return this.menuService.findOne(id, depth);
  }

  @Post()
  create(@Body() createMenuDto: { name: string; url?: string; parentId?: string }) {
    return this.menuService.create(createMenuDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMenuDto: { name?: string; url?: string; parentId?: string }) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.menuService.delete(id);
  }

  @Post("save")
  saveMenu(@Body() menuList: { id: string; parentId?: string | null }[]) {
    return this.menuService.saveMenu(menuList);
  }
}
