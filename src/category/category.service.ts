import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  getCategoriesByName(categoryName: string) {
    return this.categoryRepository.getCategoriesByName(categoryName);
  }

  getFilteredCategoriesByName(categoryName: string, userId: number) {
    return this.categoryRepository.getFilteredCategoriesByName(
      categoryName,
      userId,
    );
  }

  async getUserCategories(userId: number) {
    const categories = await this.categoryRepository.getUserCategories(userId);
    const normalizedCategories = categories.map(({ category, id }) => ({
      id,
      name: category.name,
    }));

    return normalizedCategories;
  }

  createUserCategories(userId: number, categoryIds: number[]) {
    return this.categoryRepository.createUserCategories(userId, categoryIds);
  }

  removeUserCategory(userId: number, userCategoryId: number) {
    return this.categoryRepository.removeUserCategory(userId, userCategoryId);
  }
}
