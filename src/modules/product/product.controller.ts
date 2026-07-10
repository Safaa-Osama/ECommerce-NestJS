import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { auth } from 'src/common/decorator/auth.decorator';
import { User } from 'src/common/decorator/user.decorator';
import { RoleEnum } from 'src/common/enums/userEnum';
import { multer_cloud } from 'src/common/interceptor/multer';
import type { UserDocument } from '../users/entities/user.entity';
import { CreateProductDto, IdDto, ProductQueryDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @auth({ roles: [RoleEnum.admin] })
  @UseInterceptors(FileFieldsInterceptor([
    { name: "gallery", maxCount: 5 },
    { name: "mainImage", maxCount: 1 }
  ], multer_cloud()))

  createProduct(
    @Body() body: CreateProductDto,
    @User() user: UserDocument,
    @UploadedFiles() files: { gallery?: Express.Multer.File[]; mainImage?: Express.Multer.File }
  ) {
    const gallery = files.gallery || [];
    const mainImage = files.mainImage?.[0];
    return this.productService.createProduct(user, body, gallery, mainImage);
  }

  @Get()
  getAllProducts(@Query() query: ProductQueryDto) {
    return this.productService.getAllProducts(query);
  }


  @Patch()
  @auth({ roles: [RoleEnum.admin] })
  @UseInterceptors(FileFieldsInterceptor([
    { name: "gallery", maxCount: 5 },
    { name: "mainImage", maxCount: 1 }
  ], multer_cloud()))

  updateProduct(
    @Param() param: IdDto,
    @Body() body: CreateProductDto,
    @User() user: UserDocument,
    @UploadedFiles() files: { gallery?: Express.Multer.File[]; mainImage?: Express.Multer.File }
  ) {
    const gallery = files.gallery || [];
    const mainImage = files.mainImage?.[0];
    return this.productService.updateProduct(param.id, body, user, files);
  }
}