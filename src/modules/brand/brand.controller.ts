import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post()
  create(@Body() body: CreateBrandDto) {
    return this.brandService.create(body);
  }

  @Get()
  allBrands() {
    return this.brandService.allBrands();
  }

  @Patch(':id')
  updateBrand(@Param('id') id: string, @Body() body: UpdateBrandDto) {
    return this.brandService.updateBrand(id, body);
  }

  @Delete(':id')
  deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteBrand(id);
  }
}
