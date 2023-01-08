import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetCatController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity/cat.entity';
import { Color } from './entities/color.entity/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Color])],
  controllers: [GetCatController],
  providers: [CatsService],
})
export class CatsModule {}
