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
import { customerModule } from './module/customer/customer.module';
import { CustomerController } from './controllers/customer/customer.controller';
import { transactionModule } from './module/transaction/transaction.module';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { UploadModule } from './module/upload/upload.module';
import { UploadController } from './controllers/upload/upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
      synchronize: true, // don't use in prod,
      retryAttempts: 5,
      retryDelay: 5000,
      extra: {
        connectionLimit: 10, // Set max concurrent connections
        queueLimit: 0,       // No limit on request queue
        waitForConnections: true, // Wait if pool is full
        connectTimeout: 30000, // 30 seconds
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Absolute path to the folder
      serveRoot: '/uploads', // URL prefix for accessing files
    }),
    userModule,
    productModule,
    brandModule,
    typeModule,
    bannerModule,
    customerModule,
    transactionModule,
    UploadModule
  ],
  controllers: [
    AppController,
    UserController,
    ProductController,
    BrandController,
    TypeController,
    BannerController,
    CustomerController,
    TransactionController,
    UploadController
  ],
  providers: [AppService],
})
export class AppModule { }
