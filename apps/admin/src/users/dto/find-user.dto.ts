import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserStatus, UserType } from 'libs/utils/utils';

export class FindUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  complete_name?: string; // name + last_name

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  telephone?: string;

  @IsOptional()
  @IsIn(Object.values(UserType))
  type?: string;

  @IsOptional()
  @IsIn(Object.values(UserStatus))
  status?: string;
}
