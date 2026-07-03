import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandRepo } from 'src/common/reposetories/brand-repo';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {

  constructor(
    private readonly brandRepo: BrandRepo,
  ) { }


  async create(body: CreateBrandDto) {
    const isExist = await this.brandRepo.findOne({ filter: { name:body.name } });
    if (isExist) {
      throw new BadRequestException("Brand name already exist");
    }
    const brand = await this.brandRepo.create(body);
    return brand;
  }

  async allBrands() {
    const brands = await this.brandRepo.find({ filter: { isActive: true } });
    return brands;
  }

  async updateBrand(id:string,body:UpdateBrandDto){
    
  }

  async deleteBrand(id:string){
    
  }

}