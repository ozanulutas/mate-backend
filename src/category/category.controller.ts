import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { GetCategoriesByNameDto } from './dto';
import { User } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategoriesByName(
    @User('userId') userId: number,
    @Query() query: GetCategoriesByNameDto,
  ) {
    const { filterSelected, name } = query;

    if (filterSelected) {
      return this.categoryService.getFilteredCategoriesByName(name, userId);
    }

    return this.categoryService.getCategoriesByName(name);
  }
}
