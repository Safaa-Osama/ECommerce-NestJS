import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { StoreEnum } from 'src/common/enums/multerEnum';
import { multer_cloud } from 'src/common/interceptor/multer';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseInterceptors(FilesInterceptor("gallery", 5, multer_cloud({
    storeType: StoreEnum.memory,
    maxFileSize: 5 * 1024 * 1024
  })))
  createProduct(@Body() body: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[]) {
    return this.productService.createProduct(body, files);
  }

  @Get()
  allProducts() {
    return this.productService.allProducts();
  }


}
