import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandRepo } from 'src/common/reposetories/brand-repo';
import { brandModel } from './entities/brand.entity';

@Module({
  imports: [brandModel],
  controllers: [BrandController],
  providers: [BrandService, BrandRepo],
})
export class BrandModule { }
