import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
  ) {}

  findAllCats() {
    return this.catsRepository.find();
  }

  async findOneCat(id: number) {
    const cat = await this.catsRepository.findOneBy({ id });
    if (!cat) {
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return cat;
  }

  createNewCat(createCatDto: CreateCatDto) {
    const cat = this.catsRepository.create(createCatDto);
    return this.catsRepository.save(cat);
  }

  async updateCat(id: string, updateCatDto: any) {
    const cat = await this.catsRepository.preload({
      id: +id,
      ...updateCatDto,
    });
    if (!cat) {
      throw new NotFoundException(`Cat with number ${id} not found`);
    }
    return this.catsRepository.save(cat);
  }

  async deleteCat(id: string) {
    const cat = await this.findOneCat(+id);
    return this.catsRepository.remove(cat);
  }
}
