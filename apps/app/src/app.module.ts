import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ContactService } from './contact/contact.service';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ormconfig, autoLoadEntities: true }),
    UsersModule,
    AuthModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //Intercepta todas requests e aplica o class serializer, que é necessário para utilização do decorator Exclude
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    ContactService,
  ],
})
export class AppModule {}
