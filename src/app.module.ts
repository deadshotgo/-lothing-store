import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { UserEventModule } from './user-event/user-event.module';
import {Product} from "./product/entities/product.entity";
import {Category} from "./category/entities/category.entity";
import {SubCategory} from "./sub-category/entities/sub-category.entity";
import {UserEvent} from "./user-event/entities/user-event.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageProductModule } from './image-product/image-product.module';
import {ImageProduct} from "./image-product/entities/image-product.entity";

const entities = [
    Product,
    Category,
    SubCategory,
    UserEvent,
    ImageProduct
]
@Module({
  imports: [ProductModule, CategoryModule, SubCategoryModule, UserEventModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities,
        synchronize: false,
        logging: false,
        ssl: undefined,
      }),
      inject: [ConfigService],
    }),
    ImageProductModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
