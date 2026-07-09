import { Body, Controller, Get, Param, ParseFilePipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateSubCategoryDto, IdDto, UpdateSubCategoryDto } from './dto/subCategory.dto';
import { SubCategoryService } from './sub-category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multer_cloud } from 'src/common/interceptor/multer';
import { MulterEnum, StoreEnum } from 'src/common/enums/multerEnum';
import { User } from 'src/common/decorator/user.decorator';
import type { UserDocument } from '../users/entities/user.entity';
import { auth } from 'src/common/decorator/auth.decorator';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) { }

  @Post()
  @auth({})
  @UseInterceptors(FileInterceptor('logo', multer_cloud({
    storeType: StoreEnum.memory,
    customType: MulterEnum.image,
    maxFileSize: 5 * 1024 * 1024
  }))
  )
  createSubCategory(@Body() body: CreateSubCategoryDto,
    @UploadedFile(ParseFilePipe) file: Express.Multer.File,
    @User() user: UserDocument
  ) {
    return this.subCategoryService.createSubCategory(body, file, user);
  }

  @Get()
  allSubCategories() {
    return this.subCategoryService.allSubCategories();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('logo', multer_cloud({
    storeType: StoreEnum.memory,
    customType: MulterEnum.image,
    maxFileSize: 5 * 1024 * 1024
  }))
  )
  updateSubCategory(@Param() params: IdDto,
   @Body() body: UpdateSubCategoryDto,
   @UploadedFile(ParseFilePipe) file: Express.Multer.File,
   @User() user: UserDocument
  ) {
    return this.subCategoryService.updateSubCategory(params.id, body,file,user);
  }


}
