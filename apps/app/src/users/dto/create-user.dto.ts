import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  device_token?: string;
}
