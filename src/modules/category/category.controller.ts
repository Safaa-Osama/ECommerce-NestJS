import { Body, Controller, Get, Param, ParseFilePipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, IdDto, UpdateCategoryDto } from './dto/category.dto';
import { auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/userEnum';
import { FileInterceptor } from '@nestjs/platform-express';
import { multer_cloud } from 'src/common/interceptor/multer';
import { MulterEnum, StoreEnum } from 'src/common/enums/multerEnum';
import { User } from 'src/common/decorator/user.decorator';
import type { UserDocument } from '../users/entities/user.entity';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @Post()
  @auth({ roles: [RoleEnum.admin] })
  @UseInterceptors(FileInterceptor('logo', multer_cloud({
    storeType: StoreEnum.memory,
    customType: MulterEnum.image,
    maxFileSize: 5 * 1024 * 1024
  }))
  )
  createCategory(
    @UploadedFile(ParseFilePipe) file: Express.Multer.File,
    @Body() body: CreateCategoryDto,
    @User() user: UserDocument
  ) {
    return this.categoryService.createCategory(body, file,user);
  }


  @Get()
  allCategories() {
    return this.categoryService.allCategories();
  }

  @Patch(':id')
    @UseInterceptors(FileInterceptor('logo', multer_cloud({
      storeType: StoreEnum.memory,
      customType: MulterEnum.image,
      maxFileSize: 5 * 1024 * 1024
    }))
    )
    updateCategory(@Param() params: IdDto,
     @Body() body: UpdateCategoryDto,
     @User() user: UserDocument,
     @UploadedFile(new ParseFilePipe({fileIsRequired:false})) file: Express.Multer.File,
    ) {
      return this.categoryService.updateCategory(params.id, body,user,file);
    }
}
