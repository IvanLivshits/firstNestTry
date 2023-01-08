import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { Connection, Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto/update-cat.dto';
import { Cat } from './entities/cat.entity/cat.entity';
import { Color } from './entities/color.entity/color.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    private readonly connection: Connection,
  ) {}

  findAllCats(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.catsRepository.find({
      relations: ['colors'],
      skip: offset,
      take: limit,
    });
  }

  async findOneCat(id: number) {
    const cat = await this.catsRepository.findOne({
      where: { id: id },
      relations: ['colors'],
    });
    if (!cat) {
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return cat;
  }

  async createNewCat(createCatDto: CreateCatDto) {
    const colors = await Promise.all(
      createCatDto.colors.map((name) => this.preloadColorByName(name)),
    );

    const cat = this.catsRepository.create({ ...createCatDto, colors });
    return this.catsRepository.save(cat);
  }

  async updateCat(id: string, updateCatDto: UpdateCatDto) {
    const colors =
      updateCatDto.colors &&
      (await Promise.all(
        updateCatDto.colors.map((name) => this.preloadColorByName(name)),
      ));
    const cat = await this.catsRepository.preload({
      id: +id,
      ...updateCatDto,
      colors,
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

  private async preloadColorByName(name: string): Promise<Color> {
    const existingColor = await this.colorRepository.findOne({
      where: { name: name },
    });
    if (existingColor) {
      return existingColor;
    }
    return this.colorRepository.create({ name });
  }

  async recommendCat(cat: Cat) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      cat.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_cat';
      recommendEvent.type = 'cat';
      recommendEvent.payload = { catId: cat.id };

      await queryRunner.manager.save(cat);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
