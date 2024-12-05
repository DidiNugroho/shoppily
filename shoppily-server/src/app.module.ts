import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './controllers/product/product.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
  ],
  controllers: [UserController, ProductController],
  providers: [],
})
export class AppModule {}
