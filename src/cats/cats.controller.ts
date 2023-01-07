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
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto/update-cat.dto';

@Controller('cats')
export class GetCatController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAllCats();
  }

  //Method with pagination
  // @Get()
  // findAll(@Query() paginationQuery) {
  //   const { limit, offset } = paginationQuery;
  //   return `This action returns all cats. Limit: ${limit}. Offset: ${offset}`;
  // }

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
