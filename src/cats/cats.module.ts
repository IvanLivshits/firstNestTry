import { Module } from '@nestjs/common';
import { GetCatController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({ controllers: [GetCatController], providers: [CatsService] })
export class CatsModule {}