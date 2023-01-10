import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  getCategoriesByName(categoryName: string) {
    return this.categoryRepository.getCategoriesByName(categoryName);
  }
}
