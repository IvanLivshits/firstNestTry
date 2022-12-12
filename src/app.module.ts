import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetCatController } from './get-cat/get-cat.controller';

@Module({
  imports: [],
  controllers: [AppController, GetCatController],
  providers: [AppService],
})
export class AppModule {}
