import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
