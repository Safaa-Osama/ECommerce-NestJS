import { Body, Controller, Get, Param, ParseFilePipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
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
  update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, body);
  }
}
