import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';

@Controller('cats')
export class GetCatController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  //Method with pagination
  // @Get()
  // findAll(@Query() paginationQuery) {
  //   const { limit, offset } = paginationQuery;
  //   return `This action returns all cats. Limit: ${limit}. Offset: ${offset}`;
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Post()
  createNewCat(@Body() body) {
    return this.catsService.createNewCat(body);
  }

  @Patch(':id')
  updateCat(@Param('id') id: string, @Body() body) {
    return this.catsService.updateCat(id, body);
  }

  @Delete(':id')
  deleleCat(@Param('id') id: string) {
    return this.catsService.deleteCat(id);
  }
}
