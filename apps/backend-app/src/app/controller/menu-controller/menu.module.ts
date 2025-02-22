import { MenuService } from "./menu.service";
import { Module } from "@nestjs/common";
import { PrismaService } from "../../services/prisma/prisma.service";

@Module({
  providers: [MenuService, PrismaService],
  exports: [MenuService, PrismaService],
})
export class MenuModule {}