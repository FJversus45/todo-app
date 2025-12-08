import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppModule } from 'src/app.module';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
