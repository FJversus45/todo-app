import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoFeaturesModule } from './todo-features/todo-features.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TodoFeaturesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
