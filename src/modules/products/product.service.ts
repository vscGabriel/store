import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async createProduct(product: ProductEntity) {
    await this.productRepo.save(product);
  }

  async listProduct() {
    await this.productRepo.find();
  }

  async updateProduct(id: string, product: UpdateProductDTO) {
    await this.productRepo.update(id, product);
  }

  async deleteProduct(id: string) {
    await this.productRepo.delete(id);
  }
}
