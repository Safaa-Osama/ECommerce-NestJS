import { Body, Controller, Delete, Get, Param, ParseFilePipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import { auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/userEnum';
import { FileInterceptor } from '@nestjs/platform-express';
import { multer_cloud } from 'src/common/interceptor/multer';
import { MulterEnum, StoreEnum } from 'src/common/enums/multerEnum';
import type { UserDocument } from '../users/entities/user.entity';
import { User } from 'src/common/decorator/user.decorator';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post()
  @auth({ roles: [RoleEnum.admin] })
  @UseInterceptors(FileInterceptor('logo', multer_cloud({
    storeType: StoreEnum.memory,
    customType: MulterEnum.image,
    maxFileSize: 5 * 1024 * 1024
  }))
  )
  createBrand(
    @UploadedFile(ParseFilePipe) file: Express.Multer.File,
    @Body() body: CreateBrandDto,
    @User() user: UserDocument) {
    return this.brandService.createBrand(body, file, user);
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
