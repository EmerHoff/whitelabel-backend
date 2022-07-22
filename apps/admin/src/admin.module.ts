import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import * as ormconfig from '../../../ormconfig';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ormconfig, autoLoadEntities: true }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    //Intercepta todas requests e aplica o class serializer, que é necessário para utilização do decorator Exclude
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AdminModule {}
