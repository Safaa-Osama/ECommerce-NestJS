import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { StoreEnum } from 'src/common/enums/multerEnum';
import { multer_cloud } from 'src/common/interceptor/multer';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import type { UserDocument } from '../users/entities/user.entity';
import { User } from 'src/common/decorator/user.decorator';
import { auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/userEnum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @auth({roles:[RoleEnum.admin]})
  @UseInterceptors(FilesInterceptor("gallery", 5, multer_cloud({
    storeType: StoreEnum.memory,
    maxFileSize: 5 * 1024 * 1024
  })))
  @UseInterceptors(FileInterceptor("mainImage", multer_cloud({
    storeType: StoreEnum.memory,
    maxFileSize: 5 * 1024 * 1024
  })))
  createProduct(@Body() body: CreateProductDto,
  @User() user: UserDocument,
    @UploadedFiles() files: Express.Multer.File[],
    @UploadedFiles() mainImage: Express.Multer.File) {   
    return this.productService.createProduct(body, files, mainImage,user);
  }

  @Get()
  allProducts() {
    return this.productService.allProducts();
  }


}
