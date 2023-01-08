import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto/update-cat.dto';

@Controller('cats')
export class GetCatController {
  constructor(private readonly catsService: CatsService) {}

  // @Get()
  // findAll() {
  //   return this.catsService.findAllCats();
  // }

  // Method with pagination
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    return this.catsService.findAllCats(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOneCat(+id);
  }

  @Post()
  createNewCat(@Body() createCatDto: CreateCatDto) {
    return this.catsService.createNewCat(createCatDto);
  }

  @Patch(':id')
  updateCat(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.updateCat(id, updateCatDto);
  }

  @Delete(':id')
  deleleCat(@Param('id') id: string) {
    return this.catsService.deleteCat(id);
  }
}
