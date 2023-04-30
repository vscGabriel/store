import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../validation/unique-email.validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'The name is empty' })
  @IsOptional()
  name: string;

  @IsEmail()
  @UniqueEmail({ message: 'There is a user with this email' })
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsOptional()
  password: string;
}
