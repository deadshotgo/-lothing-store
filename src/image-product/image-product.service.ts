import { Injectable } from '@nestjs/common';
import { CreateImageProductDto } from './dto/create-image-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ImageProduct} from "./entities/image-product.entity";
import {Repository} from "typeorm";
import {S3UploadService} from "../s3-upload/s3-upload.service";

@Injectable()
export class ImageProductService {
  constructor(
      @InjectRepository(ImageProduct)
      private imageProductRepository: Repository<ImageProduct>,
      private s3Service: S3UploadService,
  ) {}
  async create(data: CreateImageProductDto, files: any) {
    if (files.length) {
      for (const file of files) {
        const aws = await this.s3Service.uploadFile(
            file.buffer,
            file.mimetype,
            'products',
        );
        data.path = aws.Location;
        await this.imageProductRepository.insert(data);
      }
    }
  }

  async findOne(id: number) {
    return this.imageProductRepository.findOne({ where: { id } });
  }

  async findOneByProductId(id: number) {
    return this.imageProductRepository.find({ where: { productId: id } });
  }

  update(id: number, data) {
    return this.imageProductRepository.update(id, data);
  }

  async remove(id: number) {
    const image = await this.findOne(id);
    const result = await this.s3Service.remove(image.path);
    if (result) return this.imageProductRepository.delete(id);
  }
}
