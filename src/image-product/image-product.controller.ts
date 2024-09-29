import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles, HttpStatus, UseGuards, Put
} from '@nestjs/common';
import { ImageProductService } from './image-product.service';
import { CreateImageProductDto } from './dto/create-image-product.dto';
import { UpdateImageProductDto } from './dto/update-image-product.dto';
import {FilesInterceptor} from "@nestjs/platform-express";
import {AdminGuard} from "../auth/auth.guard";

@Controller('image-product')
export class ImageProductController {
  constructor(private readonly imageProductService: ImageProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  @UseGuards(AdminGuard)
  async create(
      @Body() data: CreateImageProductDto,
      @UploadedFiles() file: any,
  ) {
    await this.imageProductService.create(data, file);
    return HttpStatus.CREATED;
  }

  @Get(':id')
  findOneByProductId(@Param('id') id: string) {
    return this.imageProductService.findOneByProductId(+id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  update(
      @Param('id') id: string,
      @Body() updateImageProductDto: UpdateImageProductDto,
  ) {
    return this.imageProductService.update(+id, updateImageProductDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.imageProductService.remove(+id);
  }
}
