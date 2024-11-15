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
    typeModule
  ],
  controllers: [
    AppController,
    UserController,
    ProductController,
    BrandController,
    TypeController
  ],
  providers: [AppService],
})
export class AppModule { }
