import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MenuController } from './controller/menu-controller/menu.controller';
import { MenuModule } from './controller/menu-controller/menu.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './services/prisma/prisma.module';
import { PrismaService } from './services/prisma/prisma.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    MenuModule,
    PrismaModule,
  ],
  controllers: [AppController, MenuController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
