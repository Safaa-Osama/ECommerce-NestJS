import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from './dto/subCategory.dto';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) { }

  @Post()
  createSubCategory(@Body() body: CreateSubCategoryDto) {
    return this.subCategoryService.create(body);
  }

  @Get()
  allSubCategories() {
    return this.subCategoryService.allSubCategories();
  }

  @Patch(':id')
  updateSubCategory(@Param('id') id: string, @Body() body: UpdateSubCategoryDto) {
    return this.subCategoryService.updateSubCategory(id, body);
  }

  
}
