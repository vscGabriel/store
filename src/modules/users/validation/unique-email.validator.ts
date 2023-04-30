import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepo: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const existEmailUser = await this.userRepo.existEmail(value);
    return !existEmailUser;
  }
}

export const UniqueEmail = (optionsValidation: ValidationOptions) => {
  return (object: Object, propertie: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertie,
      options: optionsValidation,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
