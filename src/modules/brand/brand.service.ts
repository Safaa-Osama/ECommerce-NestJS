import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService {
  create(createBrandDto: CreateBrandDto) {
    return createBrandDto;
  }

  findAll() {
    return `This action returns all brand`;
  }

  }