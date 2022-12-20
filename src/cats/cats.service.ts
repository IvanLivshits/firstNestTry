import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    {
      id: 1,
      name: 'Padlik',
      bread: 'British',
      colors: ['Black', 'Gray', 'White'],
    },
  ];

  findAll() {
    return this.cats;
  }

  findOne(id: string) {
    const cat = this.cats.find((el) => el.id === +id);
    if (!cat) {
      //throw new HttpException(`Cat #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return cat;
  }

  createNewCat(newCat: any) {
    return this.cats.push(newCat);
  }

  updateCat(id: string, newCat: any) {
    const isCatExists = this.findOne(id);
    if (isCatExists) {
      //update the existing entity
    }
  }

  deleteCat(id: string) {
    const catIndex = this.cats.findIndex((el) => el.id === +id);
    if (catIndex >= 0) {
      this.cats.splice(catIndex, 1);
    }
  }
}
