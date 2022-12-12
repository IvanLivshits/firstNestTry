import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('get-cat')
export class GetCatController {
  @Get()
  findAll() {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This message returns cat with number - ${id}`;
  }

  @Post()
  createNewCat(@Body('age') body) {
    return body;
  }

  @Patch(':id')
  updateCat(@Param('id') id: string, @Body('name') body) {
    return `Cat #${id} was updated with params ${body}`;
  }

  @Delete(':id')
  deleleCat(@Param('id') id: string) {
    return `Cat #${id} was deleted`;
  }
}
