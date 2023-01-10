import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { GetCategoriesByNameDto } from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('search')
  getCategoriesByName(@Query() query: GetCategoriesByNameDto) {
    return this.categoryService.getCategoriesByName(query.name);
  }
}
