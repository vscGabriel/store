import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../validation/unique-email.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'The name is empty' })
  name: string;

  @IsEmail()
  @UniqueEmail({ message: 'There is a user with this email' })
  email: string;

  @MinLength(6)
  password: string;
}
