import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtInfo } from '../auth/dto/jwt.dto';
import { User } from '../auth/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@User() userInfo: JwtInfo) {
    return this.usersService.findOne(userInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@User() userInfo: JwtInfo, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userInfo, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUserAccount(@User() userInfo: JwtInfo) {
    return this.usersService.deleteUserAccount(userInfo);
  }

  // Reset Password - Solicitação de Token
  @Post('request-reset-password')
  requestResetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ) {
    return this.usersService.requestResetPassword(requestResetPasswordDto);
  }

  // Reset Password - Confirmação de Token e redefinição da senha
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(resetPasswordDto);
  }
}
