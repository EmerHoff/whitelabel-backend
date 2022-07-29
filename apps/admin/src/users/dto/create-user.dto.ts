import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { UserType } from 'libs/utils/utils';

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

  @IsIn(Object.values(UserType))
  type: string;
}
