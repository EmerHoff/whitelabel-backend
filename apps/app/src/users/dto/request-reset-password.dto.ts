import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  confirmation_email: string;
}
