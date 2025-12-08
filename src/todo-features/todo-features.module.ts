import { Module } from '@nestjs/common';
import { TodoFeaturesService } from './todo-features.service';
import { TodoFeaturesController } from './todo-features.controller';

import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TodoFeaturesController],
  providers: [TodoFeaturesService],
  exports: [TodoFeaturesService],
  imports: [PrismaModule, JwtModule],
})
export class TodoFeaturesModule {}
