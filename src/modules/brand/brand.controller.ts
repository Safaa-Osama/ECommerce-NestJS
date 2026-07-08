import { Body, Controller, Delete, Get, Param, ParseFilePipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto, IdDto, QueryBrandDto, UpdateBrandDto } from './dto/brand.dto';
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
  allBrands(@Query() query:QueryBrandDto) {
    return this.brandService.allBrands(query);
  }

  @Patch(':id')
  @auth({ roles: [RoleEnum.admin] })
  @UseInterceptors(FileInterceptor('logo', multer_cloud({
    storeType: StoreEnum.memory,
    customType: MulterEnum.image,
    maxFileSize: 5 * 1024 * 1024
  }))
  )
  updateBrand(@Param() params: IdDto,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: false })) file: Express.Multer.File,
    @Body() body: UpdateBrandDto,
    @User() user: UserDocument) {
    return this.brandService.updateBrand(params.id, body, user, file);
   }

  @Delete(':id')
  @auth({ roles: [RoleEnum.admin] })
  deleteBrand(@Param() params: IdDto) {
    return this.brandService.deleteBrand(params.id);
  }
}
