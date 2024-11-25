import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userModule } from './module/user/user.module';
import { ProductController } from './controllers/product/product.controller';
import { productModule } from './module/product/product.module';
import { brandModule } from './module/brand/brand.module';
import { BrandController } from './controllers/brand/brand.controller';
import { typeModule } from './module/type/type.module';
import { TypeController } from './controllers/type/type.controller';
import { bannerModule } from './module/banner/banner.module';
import { BannerController } from './controllers/banner/banner.controller';
import { uploadModule } from './module/upload/upload.module';
import { StorageController } from './controllers/storage/storage.controller';
import { customerModule } from './module/customer/customer.module';
import { CustomerController } from './controllers/customer/customer.controller';
import { transactionModule } from './module/transaction/transaction.module';
import { TransactionController } from './controllers/transaction/transaction.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      port: Number(process.env.PORT) || 3306,
      host: process.env.DB_HOST || "localhost",
      username: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "test",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // don't use in prod
    }),
    userModule,
    productModule,
    brandModule,
    typeModule,
    bannerModule,
    uploadModule,
    customerModule,
    transactionModule
  ],
  controllers: [
    AppController,
    UserController,
    ProductController,
    BrandController,
    TypeController,
    BannerController,
    StorageController,
    CustomerController,
    TransactionController
  ],
  providers: [AppService],
})
export class AppModule { }
