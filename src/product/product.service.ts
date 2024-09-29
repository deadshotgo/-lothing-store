import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {FilterOperator, paginate, Paginated, PaginateQuery} from "nestjs-paginate";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {Product} from "./entities/product.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {SubCategory} from "../sub-category/entities/sub-category.entity";

@Injectable()
export class ProductService {
  constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
  ) {
  }

  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.save(createProductDto)
  }

  findAll(query: PaginateQuery): Promise<Paginated<Product>> {
    return paginate(query, this.productRepository, {
      sortableColumns: ['id', 'title', 'createdAt', 'updatedAt'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        id: [FilterOperator.IN],
        title: [FilterOperator.ILIKE],
        isActive: [FilterOperator.EQ],
        createdAt: [FilterOperator.BTW],
      },
      relations: {
        subCategory: { category: true },
        images: true,
      },
    });
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: {
        subCategory: { category: true },
        images: true,
      }
    })
  }

  update(id: number, updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    return this.productRepository.update(id, updateProductDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.productRepository.softDelete(id)
  }
}
